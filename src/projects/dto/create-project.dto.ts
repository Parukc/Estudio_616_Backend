import { IsString, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  category: string;
}
