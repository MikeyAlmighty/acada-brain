import { Module } from "@nestjs/common";

import { ContentService } from "./content.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Learner } from "src/learners/learner.entity";
import { Lecturer } from "src/lecturers/lecturer.entity";
import { Repository } from "typeorm";
import { Lesson } from "src/lessons/lesson.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecturer, Learner, Lesson]),
    Repository<Lecturer>,
    Repository<Learner>,
    Repository<Lesson>,
  ],
  controllers: [],
  providers: [ContentService],
})
export class ContentModule {}
