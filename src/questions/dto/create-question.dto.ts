import { IsString, IsNotEmpty, IsArray, IsNumber } from "class-validator";

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly lessonId: number;

  @IsArray()
  @IsString({ each: true })
  readonly questions: string[];

  @IsNumber()
  @IsNotEmpty()
  readonly releaseDate: number;

  @IsNumber()
  @IsNotEmpty()
  readonly createdAt: number;
}
