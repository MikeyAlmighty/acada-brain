import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';

import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
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

  describe('Signup', () => {
    it('should SignUp', () => {
      const dto: AuthDto = {
        email: 'deadpool@gmail.com',
        firstName: 'Ryan',
        lastName: 'Reynolds',
        password: 'ChimichangasAreHot',
      };
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody(dto)
        .expectStatus(201)
        .inspect();
    });
  });

  describe('Users', () => {
    describe('Get current User', () => {});
    describe('Edit User', () => {});
  });

  describe('Courses', () => {
    describe('Create Course', () => {});
    describe('Get Courses', () => {});
    describe('Get Course byId', () => {});
    describe('Edit Course', () => {});
    describe('Edit Course', () => {});
  });

  describe('Lessons', () => {
    describe('Create Lesson', () => {});
    describe('Get Lessons', () => {});
    describe('Get Lesson byId', () => {});
    describe('Edit Lesson', () => {});
    describe('Delete Lesson', () => {});
  });
});
