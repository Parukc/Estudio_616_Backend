import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto'; // 👈 importa tu DTO

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterAuthDto) {
  if (!dto.password) throw new UnauthorizedException('Falta la contraseña');

  // Buscar si ya existe un usuario con ese email
  const existing = await this.userRepo.findOne({ where: { email: dto.email } });
  if (existing) throw new UnauthorizedException('Ya existe este usuario');

  const hashed = await bcrypt.hash(dto.password, 10);

  // Crear el nuevo usuario
  const newUser = this.userRepo.create({
  ...dto,
  password: hashed,
  role: UserRole.USER // 👈 Asignación forzada
  });


  await this.userRepo.save(newUser);
  return { message: 'Usuario creado correctamente' };
}

async login(dto: { email: string; password: string }) {
  // Buscar el usuario por email
  const user = await this.userRepo.findOne({ where: { email: dto.email } });
  if (!user) throw new UnauthorizedException('Credenciales incorrectas');

  const match = await bcrypt.compare(dto.password, user.password);
  if (!match) throw new UnauthorizedException('Credenciales incorrectas');

  const token = this.jwtService.sign({ id: user.id, role: user.role });
  return { token, role: user.role };
}

}
