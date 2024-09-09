import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";

import { ContentService } from "src/content/content.service";
import { UserResponseDto } from "src/users/dto/user-response.dto";
import { UpdateUserParams } from "src/users/type";
import { MediaType } from "src/content/types";
import { Lecturer } from "./lecturer.entity";

@Injectable()
export class LecturersService {
  constructor(
    private contentService: ContentService,
    @InjectRepository(Lecturer)
    private lecturerRepository: Repository<Lecturer>,
  ) {}

  async findLecturerById(id: string) {
    const lecturer = await this.lecturerRepository.findOneBy({ id });
    return plainToInstance(UserResponseDto, lecturer);
  }

  async updateLecturer(id: string, updatedLecturerDetails: UpdateUserParams) {
    await this.contentService.upload(
      MediaType.IMAGE,
      id,
      updatedLecturerDetails.file,
    );
    const imgUrl = await this.contentService.getSignedImageUrl(id);
    return this.lecturerRepository.update(id, {
      ...updatedLecturerDetails,
      imgUrl,
    });
  }

  deleteLecturer(id: string) {
    return this.lecturerRepository.delete(id);
  }

  async getLearnersByLecturerId(lecturerId: string) {
    return await this.lecturerRepository.findOne({
      where: { id: lecturerId },
      relations: ["learners"],
    });
  }
}
