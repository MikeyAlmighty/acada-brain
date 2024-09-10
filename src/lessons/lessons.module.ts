import { Module } from "@nestjs/common";
import { Repository } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

import { connection } from "common/constants/connection";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { Lesson } from "./lesson.entity";
import { Question } from "./question.entity";
import { Answer } from "./answer.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, Answer, Question]),
    Repository<Lesson>,
    Repository<Answer>,
    Repository<Question>,
  ],
  controllers: [LessonsController],
  providers: [
    LessonsService,
    {
      provide: "CONNECTION",
      useValue: connection,
    },
  ],
})
export class LessonsModule {}
