import { Controller, Get, Put, Post, Delete, Body } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDTO } from "./dto/create-course-dto";

@Controller("courses")
export class CoursesController {
  constructor(private courseService: CoursesService) {}
  @Post()
  create(@Body() createCourseDto: CreateCourseDTO) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
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
