import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as argon from "argon2";
import { plainToInstance } from "class-transformer";

import { User } from "./user.entity";
import { CreateUserParams, UpdateUserParams } from "./type";
import { UserResponseDto } from "./dto/user-response.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * createUser
   * @description
   * Creates a new user
   * - Hashes password
   * @param userDetails
   * @returns
   *
   */
  async createUser(userDetails: CreateUserParams) {
    const hash = await argon.hash(userDetails.password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password: hash,
      createdAt: new Date(),
    });

    const savedUser = this.userRepository.save(newUser);
    return plainToInstance(UserResponseDto, savedUser);
  }

  /**
   * findUserById
   *
   * @param id
   * @returns
   *
   */
  findUserById(id: number) {
    return this.userRepository.findBy({ id });
  }

  /**
   * getAllUsers
   *
   * @returns all users
   *
   */
  getAllUsers() {
    return this.userRepository.find();
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
