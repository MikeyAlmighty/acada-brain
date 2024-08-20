import { Module } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { connection } from "common/constants/connection";
import { LessonsController } from "./lessons.controller";

@Module({
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
