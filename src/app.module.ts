import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoursesModule } from "./courses/courses.module";
import { LoggerMiddleware } from "common/middleware/logger/logger.middleware";
import { DevConfigService } from "common/providers/DevConfigService";
import { LessonsController } from "./lessons/lessons.controller";
import { LessonsService } from "./lessons/lessons.service";
import { LessonsModule } from "./lessons/lessons.module";
import { UsersModule } from "./users/users.module";
import { QuestionsModule } from "./questions/questions.module";
import { Course } from "./courses/course.entity";
import { Lesson } from "./lessons/lesson.entity";
import { User } from "./users/user.entity";
import { Question } from "./questions/question.entity";

const devConfig = { port: 3000 };
const prodConfig = { port: 4000 };

@Module({
  imports: [
    CoursesModule,
    LessonsModule,
    UsersModule,
    QuestionsModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "172.17.0.2",
      port: 5432,
      username: "admin",
      password: "admin",
      database: "admin",
      entities: [Course, Lesson, User, Question],
      synchronize: true,
    }),
  ],
  controllers: [AppController, LessonsController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: "CONFIG",
      useFactory: () => {
        return process.env.NODE_ENV === "development" ? devConfig : prodConfig;
      },
    },
    LessonsService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("courses");
  }
}
