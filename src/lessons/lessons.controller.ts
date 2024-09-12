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
    try {
      parsedQuestions = JSON.parse(body.questions);
    } catch (error) {
      throw new BadRequestException("Invalid questions format");
    }

    const createLessonDto = plainToClass(CreateLessonDto, {
      ...body,
      lecturerId,
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

  // @Get("/learners/:id")
  // @UseGuards(JwtAuthGuard)
  // getLearnersByLessonId(
  //   @Param(
  //     "id",
  //     new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   lessonId: string,
  // ) {
  //   return this.lessonService.getLearnersByLessonId(lessonId);
  // }

  // @Get("lecturer/:id")
  // @UseGuards(JwtAuthGuard)
  // getLecturerByLessonId(
  //   @Param(
  //     "id",
  //     new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   lessonId: string,
  // ) {
  //   return this.lessonService.getLecturerByLessonId(lessonId);
  // }

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
    const lesson = await this.lessonService.findLessonById(id);
    console.log("returning lesson: ", lesson);
    return lesson;
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
