import { Exclude, Expose } from "class-transformer";

export class UserResponseDto {
  @Exclude()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: string;
}
