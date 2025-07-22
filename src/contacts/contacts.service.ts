import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  create(dto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(dto);
    return this.contactRepository.save(contact);
  }

  findAll(): Promise<Contact[]> {
    return this.contactRepository.find({ order: { createdAt: 'DESC' } });
  }
}
