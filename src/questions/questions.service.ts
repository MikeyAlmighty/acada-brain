import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateQuestionParams } from "./type";
import { Question } from "./question.entity";
import { Lesson } from "src/lessons/lesson.entity";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async createQuestion(
    lessonId: number,
    questionDetails: CreateQuestionParams,
  ) {
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });

    if (!lesson)
      throw new HttpException(
        "Lesson not found. Cannot create Question",
        HttpStatus.BAD_REQUEST,
      );

    const newQuestion = this.questionRepository.create({
      ...questionDetails,
      lesson,
    });

    return this.questionRepository.save(newQuestion);
  }

  findAll() {
    return this.questionRepository.find();
  }

  deleteQuestion(id: number) {
    return this.questionRepository.delete({ id });
  }
}
