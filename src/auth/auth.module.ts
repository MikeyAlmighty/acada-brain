import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtModule } from "@nestjs/jwt";

import { ContentService } from "src/content/content.service";
import { Learner } from "src/learners/learner.entity";
import { Lecturer } from "src/lecturers/lecturer.entity";
import { LearnersModule } from "src/learners/learners.module";
import { LecturersModule } from "src/lecturers/lecturers.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    LearnersModule,
    LecturersModule,
    TypeOrmModule.forFeature([Learner]),
    Repository<Learner>,
    TypeOrmModule.forFeature([Lecturer]),
    Repository<Lecturer>,
    JwtModule.register({
      global: true,
      secret: "super-secret",
      signOptions: {
        expiresIn: "1h",
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ContentService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
