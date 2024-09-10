export type CreateLessonParams = {
  id: number;
  title: string;
  description: string;
  releaseDate: number;
  questionIds: string[];
  createdAt: number;
};
