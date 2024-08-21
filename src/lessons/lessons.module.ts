import { Module } from "@nestjs/common";
import { Repository } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

import { connection } from "common/constants/connection";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { Lesson } from "./lesson.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), Repository<Lesson>],
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
