import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  create(data: Partial<Service>) {
    const service = this.serviceRepository.create(data);
    return this.serviceRepository.save(service);
  }

  findAll() {
    return this.serviceRepository.find();
  }

  findOne(id: number) {
    return this.serviceRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<Service>) {
    return this.serviceRepository.update(id, data);
  }

  remove(id: number) {
    return this.serviceRepository.delete(id);
  }
}
