import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { CreateQuestionDto } from "./dto/create-question.dto";

@Controller("questions")
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Post(":id")
  create(
    @Param("id", ParseIntPipe) lessonId: number,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionService.createQuestion(lessonId, createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }
}
