import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsUUID,
} from "class-validator";

export class CreateLessonDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  readonly description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}

class QuestionDto {
  @IsString()
  question: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}

class AnswerDto {
  @IsString()
  option: string;

  @IsBoolean()
  isCorrect: boolean;
}
