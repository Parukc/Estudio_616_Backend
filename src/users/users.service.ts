import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    const newUser = this.userRepository.create(userData);
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
