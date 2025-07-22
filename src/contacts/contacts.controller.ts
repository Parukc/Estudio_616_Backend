import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './contact.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  // ✅ Público: Cualquier usuario puede enviar un contacto
  @Post()
  create(@Body() dto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(dto);
  }

  // ✅ Público: Puedes protegerlo si solo el admin debe ver mensajes
  @Get()
  findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  // ✅ Solo admin puede actualizar comentario
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateComentario(
    @Param('id') id: string,
    @Body('comentario') comentario: string,
  ): Promise<Contact> {
    return this.contactsService.updateComentario(Number(id), comentario);
  }

  // ✅ Solo admin puede eliminar mensajes
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  delete(@Param('id') id: string): Promise<void> {
    return this.contactsService.delete(Number(id));
  }
}

