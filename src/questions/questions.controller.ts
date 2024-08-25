import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { QuestionsService } from "./questions.service";
import { CreateQuestionDto } from "./dto/create-question.dto";

@Controller("questions")
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Post(":id")
  @UseGuards(JwtAuthGuard)
  create(
    @Param("id", ParseIntPipe) lessonId: number,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionService.createQuestion(lessonId, createQuestionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.questionService.findAll();
  }
}
