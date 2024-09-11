import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class CreateLearnerDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly lecturerId: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  readonly image: File | Buffer | null | undefined;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
