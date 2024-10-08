import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import { LoggerMiddleware } from "common/middleware/logger/logger.middleware";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LessonsController } from "./lessons/lessons.controller";
import { LessonsService } from "./lessons/lessons.service";
import { LessonsModule } from "./lessons/lessons.module";
import { Lesson } from "./lessons/lesson.entity";
import { ContentService } from "./content/content.service";
import { ContentModule } from "./content/content.module";
import { LecturersModule } from "./lecturers/lecturers.module";
import { AuthModule } from "./auth/auth.module";
import { Learner } from "./learners/learner.entity";
import { Lecturer } from "./lecturers/lecturer.entity";
import { LearnersModule } from "./learners/learners.module";
import { LearnersService } from "./learners/learners.service";
import { LecturersService } from "./lecturers/lecturers.service";
import { LearnersController } from "./learners/learners.controller";
import { LecturersController } from "./lecturers/lecturers.controller";
import { RoleMiddleware } from "./middleware/role-middleware";
import { AuthController } from "./auth/auth.controller";
import { Question } from "./lessons/question.entity";
import { Answer } from "./lessons/answer.entity";
import { EventEmitterModule } from "@nestjs/event-emitter";

const devConfig = { port: 3001 };
const prodConfig = { port: 4000 };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "acada-brain-db-dev",
      port: 3306,
      username: "root",
      password: "admin",
      database: "acada_brain_dev",
      entities: [Lesson, Learner, Lecturer, Question, Answer],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Learner, Lecturer, Lesson, Question, Answer]),
    LessonsModule,
    ContentModule,
    LearnersModule,
    LecturersModule,
    AuthModule,
  ],
  controllers: [AppController, LessonsController],
  providers: [
    AppService,
    LearnersService,
    LecturersService,
    LessonsService,
    {
      provide: "CONFIG",
      useFactory: () => {
        return process.env.NODE_ENV === "development" ? devConfig : prodConfig;
      },
    },
    ContentService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RoleMiddleware).forRoutes("auth/login");
    consumer.apply(LoggerMiddleware).forRoutes(AuthController);
    consumer.apply(LoggerMiddleware).forRoutes(LearnersController);
    consumer.apply(LoggerMiddleware).forRoutes(LecturersController);
    consumer.apply(LoggerMiddleware).forRoutes(LessonsController);
  }
}
