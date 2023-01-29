import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CourseDto } from './dto';

@Injectable()
export class CourseService {
  constructor(private prismaService: PrismaService) {}

  async getAllCourses() {
    const courses = await this.prismaService.course.findMany({});
    return courses;
  }

  async getCourseById(id: CourseDto['id']) {
    const course = await this.prismaService.course.findUnique({
      where: {
        id,
      },
    });
    return course;
  }

  async createCourse({ name, description }: CourseDto) {
    const course = await this.prismaService.course.create({
      data: {
        isCompleted: false,
        name,
        description,
      },
    });
    return course;
  }

  // async editCourse() {}

  // async deleteCourse() {}
}
