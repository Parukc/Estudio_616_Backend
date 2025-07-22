import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.contactRepository.find({ order: { fecha: 'DESC' } });
  }

  // ✅ Editar comentario con validación segura
  async updateComentario(id: number, comentario: string): Promise<Contact> {
    const contacto = await this.contactRepository.findOne({ where: { id } });

    if (!contacto) {
      throw new NotFoundException('Contacto no encontrado');
    }

    contacto.comentario = comentario;
    return this.contactRepository.save(contacto);
  }

  // ✅ Eliminar contacto
  async delete(id: number): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
