// import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class CreateLecturerDto {
  readonly id: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly username: string;

  readonly phoneNumber: string;

  readonly email: string;

  readonly password: string;

  readonly image: File | Buffer | undefined | null;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
