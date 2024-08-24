import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";

import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";

@Controller({ path: "lessons" })
export class LessonsController {
  constructor(private lessonService: LessonsService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.createLesson(createLessonDto);
  }

  @Get()
  getLessons() {
    return this.lessonService.getAll();
  }

  @Get(":id")
  findLessonById(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.lessonService.findLessonById(id);
  }

  @Put(":id")
  updateById() {
    return "Update lessonById";
  }

  @Delete(":id")
  deleteById() {
    return "Delete lessonById";
  }
}
