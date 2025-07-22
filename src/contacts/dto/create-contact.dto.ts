import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsNotEmpty()
  mensaje: string;

  @IsNotEmpty()
  telefono: string;

  @IsOptional()
  comentario?: string;

  @IsOptional()
  fecha?: Date;
}
