import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from 'src/users/user.entity';

export class RegisterAuthDto {
  @IsString()
  nombres: string;

  @IsEmail()
  email: string;

  @IsString()
  telefono: string;

  @IsString()
  address: string;

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
