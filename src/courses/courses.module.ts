import { Module } from "@nestjs/common";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { connection } from "common/constants/connection";

@Module({
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
