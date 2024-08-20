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
  Inject,
} from "@nestjs/common";

import { Connection } from "common/constants/connection";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";

@Controller({
  path: "courses",
})
export class CoursesController {
  constructor(
    private courseService: CoursesService,
    @Inject("CONNECTION") private connection: Connection,
  ) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(":id")
  findById(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `Fetch CoursebyId ${typeof id}`;
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
