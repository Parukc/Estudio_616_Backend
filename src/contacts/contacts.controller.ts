import { Controller, Post, Body, Get } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './contact.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() dto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(dto);
  }

  @Get()
  findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }
}
