import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { QuestionsService } from "./questions.service";
import { QuestionsController } from "./questions.controller";
import { Question } from "./question.entity";
import { connection } from "common/constants/connection";
import { Lesson } from "src/lessons/lesson.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    Repository<Question>,
    TypeOrmModule.forFeature([Lesson]),
    Repository<Lesson>,
  ],
  providers: [
    QuestionsService,
    {
      provide: "CONNECTION",
      useValue: connection,
    },
  ],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
