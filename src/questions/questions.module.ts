import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { QuestionsService } from "./questions.service";
import { QuestionsController } from "./questions.controller";
import { Question } from "./question.entity";
import { connection } from "common/constants/connection";

@Module({
  imports: [TypeOrmModule.forFeature([Question]), Repository<Question>],
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
