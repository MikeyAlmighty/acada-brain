import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./user.entity";
import { CreateUserParams, UpdateUserParams } from "./type";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date().getTime(),
    });

    return this.userRepository.save(newUser);
  }

  getAll() {
    return this.userRepository.find();
  }

  updateUser(id: number, updatedUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updatedUserDetails });
  }

  remove() {}
}
