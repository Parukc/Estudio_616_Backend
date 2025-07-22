import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user.entity';


export class CreateUserDto {
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
  claveAdmin?: string; // Se requerirá solo si intenta ser admin
}
