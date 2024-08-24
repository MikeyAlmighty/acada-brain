import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "./lesson.entity";
import { Repository } from "typeorm";
import { CreateLessonDto } from "./dto/create-lesson.dto";

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}
  createLesson(lessonDetails: CreateLessonDto) {
    const newLesson = this.lessonRepository.create({
      ...lessonDetails,
      createdAt: new Date(),
    });
    return this.lessonRepository.create(newLesson);
  }
  findAll() {
    return this.lessonRepository.find();
  }
  updateById() {}
  remove() {}
}
