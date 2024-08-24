export type CreateLessonParams = {
  id: number;
  title: string;
  description: string;
  courseId: number;
  releaseDate: number;
  questionIds: string[];
  createdAt: Date;
};
