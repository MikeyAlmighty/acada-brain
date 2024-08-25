import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import * as argon from "argon2";
import { plainToInstance } from "class-transformer";

import { User } from "./user.entity";
import { CreateUserParams, UpdateUserParams } from "./type";
import { UserResponseDto } from "./dto/user-response.dto";

const DUPLICATE_ENTRY = "ER_DUP_ENTRY";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * createUser
   *
   * @description
   * Creates a new user
   * - Hashes password
   * - Returns a HTTP conflicht if emaila already exists
   * @param userDetails
   * @returns
   *
   */
  async createUser(userDetails: CreateUserParams) {
    try {
      const hash = await argon.hash(userDetails.password);
      const newUser = this.userRepository.create({
        ...userDetails,
        password: hash,
        createdAt: new Date(),
      });

      const savedUser = await this.userRepository.save(newUser);
      return plainToInstance(UserResponseDto, savedUser);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError;

        if (driverError && driverError.code === DUPLICATE_ENTRY) {
          throw new HttpException("Email already exists", HttpStatus.CONFLICT);
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
  findUserById(id: number) {
    const user = this.userRepository.findBy({ id });
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
  updateUser(id: number, updatedUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updatedUserDetails });
  }

  /**
   * deleteUser
   *
   * @description
   * Deletes a user
   * @param id
   *
   */
  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
}
