import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';
import { LessonController } from './lesson/lesson.controller';
import { LessonService } from './lesson/lesson.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [CourseController, LessonController],
  providers: [CourseService, LessonService],
})
export class AppModule {}
