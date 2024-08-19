import { IsString, IsNotEmpty, IsArray, IsDateString } from "class-validator";

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

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
