import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LessonDto } from './dto';

@Injectable()
export class LessonService {
  constructor(private prismaService: PrismaService) {}

  async getAllLessons() {
    const lessons = await this.prismaService.lesson.findMany({});
    return lessons;
  }

  async getLessonById(id: LessonDto['id']) {
    const lesson = await this.prismaService.lesson.findUnique({
      where: {
        id,
      },
    });
    return lesson;
  }

  async createLesson({ name, description, courseId }: LessonDto) {
    const lesson = await this.prismaService.lesson.create({
      data: {
        name,
        description,
        courseId,
        isCompleted: false,
      },
    });
    return lesson;
  }
}
