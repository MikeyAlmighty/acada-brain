import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateQuestionParams } from "./type";
import { Question } from "./question.entity";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  create({ question }: CreateQuestionParams) {
    const newQuestion = this.questionRepository.create({
      question,
      createdAt: new Date(),
    });
    return this.questionRepository.save(newQuestion);
  }

  findAll() {
    return this.questionRepository.find();
  }
}
