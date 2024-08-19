import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoursesModule } from "./courses/courses.module";
import { LoggerMiddleware } from "common/middleware/logger/logger.middleware";
import { DevConfigService } from "common/providers/DevConfigService";
import { LessonsController } from './lessons/lessons.controller';
import { LessonsService } from './lessons/lessons.service';
import { LessonsModule } from './lessons/lessons.module';

const devConfig = { port: 3000 };
const prodConfig = { port: 4000 };

@Module({
  imports: [CoursesModule, LessonsModule],
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
