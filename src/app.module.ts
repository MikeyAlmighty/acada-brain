import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoursesModule } from "./courses/courses.module";
import { LoggerMiddleware } from "common/middleware/logger/logger.middleware";

@Module({
  imports: [CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("courses");
  }
}
