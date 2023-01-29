import { Body, Controller, Param, Get, Post, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../auth/guard/jwt.guard';
import { LessonDto } from './dto';
import { LessonService } from './lesson.service';

@UseGuards(JwtGuard)
@Controller('lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Get()
  getAllLessons() {
    return this.lessonService.getAllLessons();
  }

  @Get(':id')
  getCourseById(@Param('id') id: LessonDto['id']) {
    return this.lessonService.getLessonById(id);
  }

  @Post('create')
  createLesson(@Body() dto: LessonDto) {
    return this.lessonService.createLesson(dto);
  }
}
