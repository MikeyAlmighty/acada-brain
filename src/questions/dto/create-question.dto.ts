import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsDate,
} from "class-validator";

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

  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;
}
