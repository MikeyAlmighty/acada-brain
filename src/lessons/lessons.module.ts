import { Module } from "@nestjs/common";
import { Repository } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

import { connection } from "common/constants/connection";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { Lesson } from "./lesson.entity";
import { Question } from "./question.entity";
import { Answer } from "./answer.entity";
import { Lecturer } from "src/lecturers/lecturer.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecturer, Lesson, Answer, Question]),
    Repository<Lecturer>,
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
