import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../users/user.entity';

export class RegisterAuthDto {
  @IsString()
  nombres: string;

  @IsEmail()
  email: string;

  @IsString()
  telefono: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  claveAdmin?: string;
}
