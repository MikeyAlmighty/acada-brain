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
      createdAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  findUserById(id: number) {
    return this.userRepository.findBy({ id });
  }

  getAll() {
    return this.userRepository.find();
  }

  updateUser(id: number, updatedUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updatedUserDetails });
  }

  remove() {}
}
