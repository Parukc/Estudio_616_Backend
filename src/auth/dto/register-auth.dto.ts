// src/auth/dto/register-auth.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../users/user.entity';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  role?: UserRole;

  @IsOptional()
  claveAdmin?: string;
}
