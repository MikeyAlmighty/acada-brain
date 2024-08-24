import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateLessonDto } from "./dto/create-lesson.dto";
import { Lesson } from "./lesson.entity";

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  createLesson(lessonDetails: CreateLessonDto) {
    const newLesson = this.lessonRepository.create({
      ...lessonDetails,
      releaseDate: new Date(lessonDetails.releaseDate),
      createdAt: new Date(),
    });
    return this.lessonRepository.save(newLesson);
  }

  getAll() {
    return this.lessonRepository.find({
      relations: ["questions"],
      relationLoadStrategy: "join",
    });
  }

  findLessonById(id: number) {
    return this.lessonRepository.findOne({
      where: { id },
      relations: ["questions"],
    });
  }

  updateById() {}

  remove() {}
}
