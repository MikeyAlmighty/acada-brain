import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CourseDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @IsString()
  description: string;
}
