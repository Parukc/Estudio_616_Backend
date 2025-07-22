import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
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

  // ✅ PUT para actualizar comentario
  @Put(':id')
  async updateComentario(
    @Param('id') id: string,
    @Body('comentario') comentario: string,
  ): Promise<Contact> {
    return this.contactsService.updateComentario(Number(id), comentario);
  }

  // ✅ DELETE para eliminar
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.contactsService.delete(Number(id));
  }
}
