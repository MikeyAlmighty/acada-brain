import { Exclude, Expose } from "class-transformer";

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  imgUrl: string;

  @Expose()
  email: string;

  @Expose()
  lastName: string;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: string;
}
