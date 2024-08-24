import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
