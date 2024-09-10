import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as argon from "argon2";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";

import { JwtService } from "@nestjs/jwt";
import { CreateUserParams, LoginParams } from "src/users/type";
import { Learner } from "src/learners/learner.entity";
import { Lecturer } from "src/lecturers/lecturer.entity";
import { plainToInstance } from "class-transformer";
import { UserResponseDto } from "src/users/dto/user-response.dto";
import { ContentService } from "src/content/content.service";
import { MediaType } from "src/content/types";

const DUPLICATE_ENTRY = "ER_DUP_ENTRY";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private contentService: ContentService,
    @InjectRepository(Lecturer)
    private lecturerRepository: Repository<Lecturer>,
    @InjectRepository(Learner)
    private learnerRepository: Repository<Learner>,
  ) {}

  async validateLecturer(loginDetails: LoginParams) {
    const { username, password } = loginDetails;
    const userFromDB = await this.lecturerRepository.findOneBy({
      username,
    });
    if (!userFromDB) {
      throw new ForbiddenException("Lecturer Credentials incorrect");
    }
    const doesPasswordMatch = await argon.verify(userFromDB.password, password);
    if (!doesPasswordMatch) {
      throw new ForbiddenException("Lecturer Credentials incorrect");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = userFromDB;
    return {
      accessToken: this.jwtService.sign(user),
      ...user,
      name: user.username,
    };
  }

  async validateLearner(loginDetails: LoginParams) {
    const { username, password } = loginDetails;
    console.log("username: ", username);
    const userFromDB = await this.learnerRepository.findOneBy({
      username,
    });
    if (!userFromDB) {
      throw new ForbiddenException("Learner Credentials incorrect");
    }
    const doesPasswordMatch = await argon.verify(userFromDB.password, password);
    if (!doesPasswordMatch) {
      throw new ForbiddenException("Learner Credentials incorrect");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = userFromDB;
    return {
      accessToken: this.jwtService.sign(user),
      ...user,
      name: user.username,
    };
  }

  async signUpLecturer(lecturerDetails: CreateUserParams) {
    try {
      const hash = await argon.hash(lecturerDetails.password);
      const newUser = this.lecturerRepository.create({
        ...lecturerDetails,
        password: hash,
        createdAt: new Date(),
      });

      const imgUrl = await this.contentService.getSignedImageUrl(
        lecturerDetails.id,
        MediaType.IMAGE,
      );

      const userFromDB = await this.lecturerRepository.save({
        ...newUser,
        imgUrl,
      });
      return plainToInstance(UserResponseDto, userFromDB);
    } catch (error) {
      console.error(error);
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError;

        if (driverError && driverError.code === DUPLICATE_ENTRY) {
          throw new HttpException(
            "Username already exists",
            HttpStatus.CONFLICT,
          );
        }
      }
    }
  }

  async signUpLearner(learnerDetails: CreateUserParams) {
    try {
      const hash = await argon.hash(learnerDetails.password);
      const newUser = this.learnerRepository.create({
        ...learnerDetails,
        password: hash,
        createdAt: new Date(),
      });

      const imgUrl = await this.contentService.getSignedImageUrl(
        learnerDetails.id,
        MediaType.IMAGE,
      );

      const userFromDB = await this.learnerRepository.save({
        ...newUser,
        imgUrl,
      });
      return plainToInstance(UserResponseDto, userFromDB);
    } catch (error) {
      console.error(error);
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError;

        if (driverError && driverError.code === DUPLICATE_ENTRY) {
          throw new HttpException(
            "Username already exists",
            HttpStatus.CONFLICT,
          );
        }
      }
    }
  }

  async login(
    username: string,
    password: string,
    role: "lecturer" | "learner",
  ) {
    let user;

    if (role === "lecturer") {
      user = await this.validateLecturer({ username, password });
    } else if (role === "learner") {
      user = await this.validateLearner({ username, password });
    } else {
      throw new UnauthorizedException();
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return { accessToken: token, ...user };
  }
}
