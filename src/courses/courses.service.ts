import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateCourseParams } from "./type";
import { Course } from "./course.entity";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  createCourse(courseDetails: CreateCourseParams) {
    const newCourse = this.courseRepository.create({
      ...courseDetails,
      createdAt: new Date(),
    });
    return this.courseRepository.save(newCourse);
  }

  getAll() {
    return this.courseRepository.find();
  }

  findCourseById(id: number) {
    return this.courseRepository.findOne({
      where: { id },
      relations: ["lessons"],
    });
  }

  update() {}

  remove() {}
}
