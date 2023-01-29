import { Body, Controller, Post, Get, UseGuards, Param } from '@nestjs/common';

import { JwtGuard } from '../auth/guard/jwt.guard';
import { CourseService } from './course.service';
import { CourseDto } from './dto';

@UseGuards(JwtGuard)
@Controller('courses')
export class CourseController {
  constructor(private courseServce: CourseService) {}
  @Get()
  getAllCourses() {
    return this.courseServce.getAllCourses();
  }

  @Get(':id')
  getCourseById(@Param('id') id: CourseDto['id']) {
    return this.courseServce.getCourseById(id);
  }

  @Post('create')
  createCourse(@Body() dto: CourseDto) {
    return this.courseServce.createCourse(dto);
  }

  // @Patch()
  // editCourse(@GetUser() userId: User['id']) {}

  // @Delete()
  // deleteCourse(@GetUser() userId: User['id']) {}
}
