import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,
  ) {}

  create(dto: CreateServiceDto) {
    const nuevo = this.serviceRepo.create(dto);
    return this.serviceRepo.save(nuevo);
  }

  findAll() {
    return this.serviceRepo.find({ order: { id: 'DESC' } });
  }

  async update(id: number, dto: CreateServiceDto) {
    await this.serviceRepo.update(id, dto);
    return this.serviceRepo.findOne({ where: { id } });
  }

  delete(id: number) {
    return this.serviceRepo.delete(id);
  }
}
