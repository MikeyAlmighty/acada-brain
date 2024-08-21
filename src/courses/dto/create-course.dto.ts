import { IsString, IsNotEmpty, IsArray, IsNumber } from "class-validator";
import { Lesson } from "src/lessons/lesson.entity";

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  readonly lessons: Lesson[];

  @IsNumber()
  @IsNotEmpty()
  readonly releaseDate: number;
}
