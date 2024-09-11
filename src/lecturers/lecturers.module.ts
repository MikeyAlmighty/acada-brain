import { Module } from "@nestjs/common";
import { LecturersController } from "./lecturers.controller";
import { LecturersService } from "./lecturers.service";
import { Lecturer } from "./lecturer.entity";
import { Repository } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Lecturer]), Repository<Lecturer>],
  controllers: [LecturersController],
  providers: [LecturersService],
})
export class LecturersModule {}
