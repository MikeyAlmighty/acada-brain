import { IsString, IsNotEmpty, IsArray, IsDateString } from "class-validator";

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  @IsString({ each: true })
  readonly lessons: string[]; // Type Lesson[]

  @IsDateString()
  @IsNotEmpty()
  readonly releaseDate: Date;
}
