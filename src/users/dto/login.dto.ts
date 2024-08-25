import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
