import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterAuthDto) {
    if (!dto.password) {
      throw new UnauthorizedException('Falta la contraseña');
    }

    // Validar que el usuario no exista
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new UnauthorizedException('Ya existe este usuario');
    }

    // Validar clave de administrador si intenta registrarse como admin
    if (dto.role === UserRole.ADMIN) {
      if (dto.claveAdmin !== process.env.CLAVE_ADMIN_SECRETA) {
        throw new UnauthorizedException('Clave de administrador incorrecta');
      }
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const newUser = this.userRepo.create({
      ...dto,
      password: hashed,
      role: dto.role || UserRole.USER, // ✅ Toma el rol enviado o asigna 'user' por defecto
    });

    await this.userRepo.save(newUser);
    return { message: 'Usuario creado correctamente' };
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role });
    return { token, role: user.role };
  }
}
