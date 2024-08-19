import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDateString,
  IsNumber,
} from "class-validator";

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly courseId: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  @IsString({ each: true })
  readonly questions: string[];

  @IsDateString()
  @IsNotEmpty()
  readonly releaseDate: Date;
}
