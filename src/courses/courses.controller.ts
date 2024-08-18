import { Controller, Get, Put, Post, Delete } from "@nestjs/common";
import { CoursesService } from "./courses.service";

@Controller("courses")
export class CoursesController {
  constructor(private courseService: CoursesService) {}
  @Post()
  create() {
    this.courseService.create("");
  }

  @Get()
  findAll() {
    return "All Courses";
  }

  @Get(":id")
  findById() {
    return "Fetch CoursebyId";
  }

  @Put(":id")
  updateById() {
    return "Update CoursebyId";
  }

  @Delete(":id")
  deleteById() {
    return "Delete CoursebyId";
  }
}
