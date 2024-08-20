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
import { CreateLessonDto } from "./dto/create-lesson-dto";

@Controller("lessons")
export class LessonsController {
  constructor(private lessonService: LessonsService) {}
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Get()
  findAll() {
    return this.lessonService.findAll();
  }

  @Get(":id")
  findById(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `Fetch lessonById ${typeof id}`;
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
