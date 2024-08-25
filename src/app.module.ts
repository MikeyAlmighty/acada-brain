import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import { LoggerMiddleware } from "common/middleware/logger/logger.middleware";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoursesModule } from "./courses/courses.module";
import { LessonsController } from "./lessons/lessons.controller";
import { LessonsService } from "./lessons/lessons.service";
import { LessonsModule } from "./lessons/lessons.module";
import { UsersModule } from "./users/users.module";
import { QuestionsModule } from "./questions/questions.module";
import { Course } from "./courses/course.entity";
import { Lesson } from "./lessons/lesson.entity";
import { User } from "./users/user.entity";
import { Question } from "./questions/question.entity";
import { CoursesController } from "./courses/courses.controller";
import { QuestionsController } from "./questions/questions.controller";
import { CoursesService } from "./courses/courses.service";
import { UsersService } from "./users/users.service";
import { QuestionsService } from "./questions/questions.service";
import { UsersController } from "./users/users.controller";

const devConfig = { port: 3000 };
const prodConfig = { port: 4000 };

@Module({
  imports: [
    CoursesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LessonsModule,
    UsersModule,
    QuestionsModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "acada-brain-db-dev",
      port: 3306,
      username: "root",
      password: "admin",
      database: "acada_brain_dev",
      entities: [Course, Lesson, User, Question],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Course, Lesson, Question]),
  ],
  controllers: [
    AppController,
    LessonsController,
    CoursesController,
    QuestionsController,
  ],
  providers: [
    AppService,
    CoursesService,
    UsersService,
    LessonsService,
    QuestionsService,
    {
      provide: "CONFIG",
      useFactory: () => {
        return process.env.NODE_ENV === "development" ? devConfig : prodConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
    consumer.apply(LoggerMiddleware).forRoutes(LessonsController);
    consumer.apply(LoggerMiddleware).forRoutes(CoursesController);
    consumer.apply(LoggerMiddleware).forRoutes(QuestionsController);
  }
}
