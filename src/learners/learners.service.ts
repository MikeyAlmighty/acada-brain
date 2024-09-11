import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";

import { Learner } from "./learner.entity";
import { CreateUserParams, UpdateUserParams } from "src/users/type";
import { UserResponseDto } from "src/users/dto/user-response.dto";
import { Lecturer } from "src/lecturers/lecturer.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class LearnersService {
  constructor(
    @InjectRepository(Learner)
    private learnerRepository: Repository<Learner>,
    @InjectRepository(Lecturer)
    private lecturerRepository: Repository<Lecturer>,
    private eventEmitter: EventEmitter2,
  ) {}

  async findLearnerById(id: string) {
    const learner = await this.learnerRepository.findOneBy({ id });
    return plainToInstance(UserResponseDto, learner);
  }

  getAllLearners() {
    const learners = this.learnerRepository.find();
    return plainToInstance(UserResponseDto, learners);
  }

  // Create learner and associate with lecturer
  async createLearner(
    lecturerId: string,
    learnerDetails: CreateUserParams,
    image: Express.Multer.File,
  ) {
    // Find the lecturer
    const lecturer = await this.lecturerRepository.findOne({
      where: { id: lecturerId },
    });
    if (!lecturer) {
      throw new Error("Lecturer not found");
    }

    // Create a new learner and associate it with the lecturer
    const learner = this.learnerRepository.create({
      ...learnerDetails,
      lecturer,
    });

    const savedLearner = await this.learnerRepository.save(learner);

    this.eventEmitter.emit("user.image.upload", {
      userId: savedLearner.id,
      image,
      isLecturer: false,
    });
  }

  async updateLearner(id: string, updatedLearnerDetails: UpdateUserParams) {
    return this.learnerRepository.update(id, updatedLearnerDetails);
  }

  deleteLearner(id: string) {
    return this.learnerRepository.delete(id);
  }
}
