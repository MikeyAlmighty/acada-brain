import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";

import { ContentService } from "src/content/content.service";
import { MediaType } from "src/content/types";
import { Learner } from "./learner.entity";
import { UpdateUserParams } from "src/users/type";
import { UserResponseDto } from "src/users/dto/user-response.dto";

@Injectable()
export class LearnersService {
  constructor(
    private contentService: ContentService,
    @InjectRepository(Learner) private learnerRepository: Repository<Learner>,
  ) {}

  async findLearnerById(id: string) {
    const learner = await this.learnerRepository.findOneBy({ id });
    return plainToInstance(UserResponseDto, learner);
  }

  getAllLearners() {
    const learners = this.learnerRepository.find();
    return plainToInstance(UserResponseDto, learners);
  }

  async updateLearner(id: string, updatedLearnerDetails: UpdateUserParams) {
    await this.contentService.upload(
      MediaType.IMAGE,
      id,
      updatedLearnerDetails.file,
    );
    const imgUrl = await this.contentService.getSignedImageUrl(id);
    return this.learnerRepository.update(id, {
      ...updatedLearnerDetails,
      imgUrl,
    });
  }

  deleteLearner(id: string) {
    return this.learnerRepository.delete(id);
  }
}
