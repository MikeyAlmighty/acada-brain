import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import * as argon from "argon2";
import { plainToInstance } from "class-transformer";
import { JwtService } from "@nestjs/jwt";

import { User } from "./user.entity";
import { CreateUserParams, LoginParams, UpdateUserParams } from "./type";
import { UserResponseDto } from "./dto/user-response.dto";
import { ContentService } from "src/content/content.service";

const DUPLICATE_ENTRY = "ER_DUP_ENTRY";

@Injectable()
export class UsersService {
  constructor(
    private contentService: ContentService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * validateUser
   * @description
   * Checks to see if user credentials are correct
   * @param loginDetails
   * @returns
   *
   */
  async validateUser(loginDetails: LoginParams) {
    const { username, password } = loginDetails;
    const userFromDB = await this.userRepository.findOneBy({
      username,
    });
    if (!userFromDB) {
      throw new ForbiddenException("Credentials incorrect");
    }
    const doesPasswordMatch = await argon.verify(userFromDB.password, password);
    if (!doesPasswordMatch) {
      throw new ForbiddenException("Credentials incorrect");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = userFromDB;
    return {
      accessToken: this.jwtService.sign(user),
      ...user,
      name: user.username,
    };
  }

  /**
   * signUp
   *
   * @description
   * Creates a new user
   * - Hashes password
   * - Returns a HTTP conflict if 'username' already exists
   * @param userDetails
   * @returns
   *
   */
  async signUp(userDetails: CreateUserParams) {
    try {
      const hash = await argon.hash(userDetails.password);
      const newUser = this.userRepository.create({
        ...userDetails,
        password: hash,
        createdAt: new Date(),
      });

      const imgUrl = await this.contentService.getSignedImageUrl(
        userDetails.id,
      );

      const userFromDB = await this.userRepository.save({ ...newUser, imgUrl });
      return plainToInstance(UserResponseDto, userFromDB);
    } catch (error) {
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

  /**
   * findUserById
   *
   * @param id
   * @returns
   *
   */
  async findUserById(id: string) {
    const user = this.userRepository.findOneBy({ id });
    return plainToInstance(UserResponseDto, user);
  }

  /**
   * getAllUsers
   *
   * @returns all users
   *
   */
  getAllUsers() {
    const users = this.userRepository.find();
    return plainToInstance(UserResponseDto, users);
  }

  /**
   * updateUser
   *
   * @description
   * Updates user details
   * @param id
   * @param updatedUserDetails
   * @returns
   *
   */
  async updateUser(id: string, updatedUserDetails: UpdateUserParams) {
    const imgUrl = await this.contentService.getSignedImageUrl(id);
    return this.userRepository.update(id, { ...updatedUserDetails, imgUrl });
  }

  /**
   * deleteUser
   *
   * @description
   * Deletes a user
   * @param id
   *
   */
  deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}
