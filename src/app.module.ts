import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import { LoggerMiddleware } from "common/middleware/logger/logger.middleware";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LessonsController } from "./lessons/lessons.controller";
import { LessonsService } from "./lessons/lessons.service";
import { LessonsModule } from "./lessons/lessons.module";
import { UsersModule } from "./users/users.module";
import { QuestionsModule } from "./questions/questions.module";
import { Lesson } from "./lessons/lesson.entity";
import { User } from "./users/user.entity";
import { Question } from "./questions/question.entity";
import { QuestionsController } from "./questions/questions.controller";
import { UsersService } from "./users/users.service";
import { QuestionsService } from "./questions/questions.service";
import { UsersController } from "./users/users.controller";
import { ContentService } from "./content/content.service";
import { ContentController } from "./content/content.controller";
import { ContentModule } from "./content/content.module";

const devConfig = { port: 3001 };
const prodConfig = { port: 4000 };

@Module({
  imports: [
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
      entities: [Lesson, User, Question],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Lesson, Question]),
    ContentModule,
  ],
  controllers: [
    AppController,
    LessonsController,
    QuestionsController,
    ContentController,
  ],
  providers: [
    AppService,
    UsersService,
    LessonsService,
    QuestionsService,
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
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
    consumer.apply(LoggerMiddleware).forRoutes(LessonsController);
    consumer.apply(LoggerMiddleware).forRoutes(QuestionsController);
  }
}
