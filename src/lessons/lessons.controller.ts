import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Controller({ path: "lessons" })
export class LessonsController {
  constructor(private lessonService: LessonsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("video"))
  async create(@UploadedFile() video: Express.Multer.File, @Body() body) {
    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(body.questions);
    } catch (error) {
      throw new BadRequestException("Invalid questions format");
    }

    const createLessonDto = plainToClass(CreateLessonDto, {
      ...body,
      questions: parsedQuestions,
    });

    const validationErrors = await validate(createLessonDto);
    if (validationErrors.length > 0) {
      throw new BadRequestException(
        "Validation failed: " + validationErrors.toString(),
      );
    }

    return this.lessonService.createLesson(createLessonDto, video);
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
