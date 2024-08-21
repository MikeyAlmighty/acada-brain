import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateCourseParams } from "./type";
import { Course } from "./course.entity";

@Injectable({
  scope: Scope.TRANSIENT, // TODO: Remove to revert to default?
})
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}
  create(courseDetails: CreateCourseParams) {
    const newCourse = this.courseRepository.create({
      ...courseDetails,
      createdAt: new Date().getTime(),
    });
    return this.courseRepository.save(newCourse);
  }
  findAll() {
    return [];
  }
  update() {}
  remove() {}
}
