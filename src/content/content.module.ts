import { Module } from "@nestjs/common";

import { ContentService } from "./content.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Learner } from "src/learners/learner.entity";
import { Lecturer } from "src/lecturers/lecturer.entity";
import { Repository } from "typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecturer, Learner]),
    Repository<Lecturer>,
    Repository<Learner>,
  ],
  controllers: [],
  providers: [ContentService],
})
export class ContentModule {}
