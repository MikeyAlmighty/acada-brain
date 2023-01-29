import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';

import { AppModule } from '../src/app.module';

import { PrismaService } from '../src/prisma/prisma.service';

import { AuthDto } from '../src/auth/dto';
import { LessonDto } from '../src/lesson/dto';
import { EditUserDto } from '../src/user/dto';
import { CourseDto } from 'src/course/dto';

describe('App End-2-End', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'deadpool@gmail.com',
      firstName: 'Ryan',
      lastName: 'Reynolds',
      password: 'ChimichangasAreHot',
    };
    const { firstName, lastName, password, email } = dto;
    describe('Signup', () => {
      it('should throw error if email is not provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ firstName, lastName, password })
          .expectStatus(400);
      });
      it('should throw error if password is not provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ firstName, lastName, email })
          .expectStatus(400);
      });
      it('should throw error if firstName is not provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ lastName, email, password })
          .expectStatus(400);
      });
      it('should throw error if lastName is not provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ firstName, email, password })
          .expectStatus(400);
      });

      it('should SignUp', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('should throw error if email is not provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ firstName, lastName, password })
          .expectStatus(400);
      });
      it('should throw error if password is not provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ firstName, lastName, email })
          .expectStatus(400);
      });
      it('should SignIn if correct credentials are provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('Users', () => {
    describe('Get current User', () => {
      it('Should GET current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit User', () => {
      const dto: EditUserDto = {
        firstName: 'Cable',
        lastName: 'Enemy',
        email: 'deadpoolhater@gmail.com',
      };
      it('Should edit user details successfully', () => {
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.lastName);
      });
    });
  });

  describe('Courses', () => {
    const dto: CourseDto = {
      name: 'Nest.js Introductory Course',
      description:
        'An introduction of the Nest.js Framework. A progressive Node.js framework for building efficient, reliable and scalable server-side applications.',
    };
    describe('Create Course', () => {
      it('Should create Course successfully', () => {
        return pactum
          .spec()
          .post('/courses/create')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(201)
          .stores('courseId', 'id');
      });
    });
    describe('Get Courses', () => {
      it('Should return courses', () => {
        return pactum
          .spec()
          .get('/courses')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });
    describe('Get Course byId', () => {
      it('Should return course byId', () => {
        return pactum
          .spec()
          .get('/courses/$S{courseId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    // describe('Edit Course byId', () => {});
    // describe('Delete Course byId', () => {});
  });

  describe('Lessons', () => {
    const dto: LessonDto = {
      name: 'Installing Nest.js',
      description: 'Installing Nest.js',
      courseId: '$S{courseId}',
    };
    describe('Create Lesson', () => {
      it('should create Lesson 1 successfully', () => {
        return pactum
          .spec()
          .post('/lessons/create')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('lessonId', 'id');
      });
    });
    describe('Get Lessons', () => {
      it('Should return lessons', () => {
        return pactum
          .spec()
          .get('/lessons')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });
    describe('Get Lesson by Id', () => {
      it('Should return lesson byId', () => {
        return pactum
          .spec()
          .get('/lessons/$S{lessonId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    // describe('Get Lesson byId', () => {});
    // describe('Edit Lesson byId', () => {});
    // describe('Delete Lesson byId', () => {});
  });
});
