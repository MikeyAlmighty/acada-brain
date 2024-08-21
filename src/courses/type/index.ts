import { CreateLessonParams } from "src/lessons/type";

export type CreateCourseParams = {
  title: string;
  description: string;
  releaseDate: number;
  lessons: CreateLessonParams[];
};
