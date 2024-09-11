import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Learner } from "./learner.entity";
import { LearnersService } from "./learners.service";
import { LearnersController } from "./learners.controller";
import { Lecturer } from "src/lecturers/lecturer.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Learner]),
    TypeOrmModule.forFeature([Lecturer]),
    Repository<Learner>,
    Repository<Lecturer>,
  ],
  providers: [LearnersService],
  controllers: [LearnersController],
})
export class LearnersModule {}
