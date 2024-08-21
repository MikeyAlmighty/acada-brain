import { Module } from "@nestjs/common";
import { Repository } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

import { connection } from "common/constants/connection";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { Course } from "./course.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Course]), Repository<Course>],
  controllers: [CoursesController],
  providers: [
    CoursesService,
    {
      provide: "CONNECTION",
      useValue: connection,
    },
  ],
})
export class CoursesModule {}
