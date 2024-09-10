import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";

import { ContentService } from "src/content/content.service";
import { MediaType } from "src/content/types";
import { Learner } from "./learner.entity";
import { CreateUserParams, UpdateUserParams } from "src/users/type";
import { UserResponseDto } from "src/users/dto/user-response.dto";
import { Lecturer } from "src/lecturers/lecturer.entity";

@Injectable()
export class LearnersService {
  constructor(
    private contentService: ContentService,
    @InjectRepository(Learner)
    private learnerRepository: Repository<Learner>,
    @InjectRepository(Lecturer)
    private lecturerRepository: Repository<Lecturer>,
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
  ): Promise<Learner> {
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

    // Save the learner
    return this.learnerRepository.save(learner);
  }

  async updateLearner(id: string, updatedLearnerDetails: UpdateUserParams) {
    await this.contentService.upload(
      MediaType.IMAGE,
      id,
      updatedLearnerDetails.file,
    );
    const imgUrl = await this.contentService.getSignedImageUrl(
      id,
      MediaType.IMAGE,
    );
    return this.learnerRepository.update(id, {
      ...updatedLearnerDetails,
      imgUrl,
    });
  }

  deleteLearner(id: string) {
    return this.learnerRepository.delete(id);
  }
}
