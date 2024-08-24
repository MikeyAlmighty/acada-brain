import { IsString, IsNotEmpty, IsNumber, IsDate } from "class-validator";

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  readonly question: string;
}
