import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
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
  @UseGuards(JwtAuthGuard)
  getLessons() {
    return this.lessonService.getAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findLessonById(
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.lessonService.findLessonById(id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  updateById() {
    return "Update lessonById";
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  deleteUser(
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    this.lessonService.deleteLesson(id);
  }
}
