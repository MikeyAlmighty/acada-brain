import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  readonly question: string;

  @IsNumber()
  @IsOptional()
  readonly lessonId: number;
}
