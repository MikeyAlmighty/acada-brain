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

  @Post(":id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("video"))
  async create(
    @UploadedFile() video: Express.Multer.File,
    @Body() body,
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    lecturerId: string,
  ) {
    let parsedQuestions;
    let learnerIds;
    try {
      parsedQuestions = JSON.parse(body.questions);
      learnerIds = JSON.parse(body.learnerIds);
    } catch (error) {
      throw new BadRequestException("Invalid questions format");
    }

    const createLessonDto = plainToClass(CreateLessonDto, {
      ...body,
      lecturerId,
      learnerIds,
      questions: parsedQuestions,
    });

    const validationErrors = await validate(createLessonDto);
    if (validationErrors.length > 0) {
      throw new BadRequestException(
        "Validation failed: " + validationErrors.toString(),
      );
    }

    console.log("body: ", body);
    return this.lessonService.createLesson(createLessonDto, video);
  }

  @Get("learner/:id")
  @UseGuards(JwtAuthGuard)
  getLessonsByLearnerId(
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    learnerId: string,
  ) {
    return this.lessonService.getLessonsByLearnerId(learnerId);
  }

  @Get("lecturer/:id")
  @UseGuards(JwtAuthGuard)
  getLessonsByLecturerId(
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    lecturerId: string,
  ) {
    return this.lessonService.getLessonsByLecturerId(lecturerId);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findLessonById(
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return await this.lessonService.findLessonById(id);
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
