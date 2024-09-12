import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";

import { UserResponseDto } from "src/users/dto/user-response.dto";
import { UpdateUserParams } from "src/users/type";
import { Lecturer } from "./lecturer.entity";

@Injectable()
export class LecturersService {
  constructor(
    @InjectRepository(Lecturer)
    private lecturerRepository: Repository<Lecturer>,
  ) {}

  async findLecturerById(id: string) {
    const lecturer = await this.lecturerRepository.findOneBy({ id });
    return plainToInstance(UserResponseDto, lecturer);
  }

  async updateLecturer(id: string, updatedLecturerDetails: UpdateUserParams) {
    return this.lecturerRepository.update(id, updatedLecturerDetails);
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

  async getLessonsByLecturerId(lecturerId: string) {
    const lecturer = await this.lecturerRepository.findOne({
      where: { id: lecturerId },
      relations: ["lessons"],
    });
    if (!lecturer) throw new Error("Lecturer not found");

    // Return all lessons for this lecturer
    return lecturer.lessons;
  }
}
