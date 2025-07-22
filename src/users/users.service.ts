import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    // Verificar si el correo ya está en uso
    const existing = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existing) throw new UnauthorizedException('Este correo ya está registrado.');

    let roleToAssign = UserRole.USER;

    if (userData.role === UserRole.ADMIN) {
      if (userData.claveAdmin !== process.env.CLAVE_ADMIN_SECRETA) {
        throw new UnauthorizedException('Clave de administrador incorrecta.');
      }
      roleToAssign = UserRole.ADMIN;
    }

    const newUser = this.userRepository.create({
      ...userData,
      role: roleToAssign,
    });

    return this.userRepository.save(newUser);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, userData: UpdateUserDto) {
    await this.userRepository.update(id, userData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (user) {
      await this.userRepository.remove(user);
      return { message: 'Usuario eliminado correctamente' };
    }
    return { message: 'Usuario no encontrado' };
  }
}
