export type CreateLessonParams = {
  id: number;
  title: string;
  description: string;
  courseId: number;
  releaseDate: number;
  questions: any[]; // TODO: Type correctly with QuestionParams
  createdAt: Date;
};
