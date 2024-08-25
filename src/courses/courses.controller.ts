import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";

@Controller({ path: "courses" })
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getCourses() {
    return this.courseService.getAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findCourseById(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.courseService.findCourseById(id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  updateById() {
    return "Update CoursebyId";
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  deleteById() {
    return "Delete CoursebyId";
  }
}
