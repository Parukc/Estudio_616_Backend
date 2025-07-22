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

  // ✅ Crear contacto
  create(dto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(dto);
    return this.contactRepository.save(contact);
  }

  // ✅ Obtener todos los contactos, ordenados por fecha descendente
  findAll(): Promise<Contact[]> {
    return this.contactRepository.find({
      order: { fecha: 'DESC' },
    });
  }

  // ✅ Editar comentario con verificación de existencia
  async updateComentario(id: number, comentario: string): Promise<Contact> {
    await this.contactRepository.update(id, { comentario });

    const contact = await this.contactRepository.findOne({ where: { id } });

    if (!contact) {
      throw new NotFoundException(`Contacto con ID ${id} no encontrado`);
    }

    return contact;
  }

  // ✅ Eliminar contacto con verificación (opcional)
  async delete(id: number): Promise<void> {
    const contact = await this.contactRepository.findOne({ where: { id } });

    if (!contact) {
      throw new NotFoundException(`Contacto con ID ${id} no encontrado`);
    }

    await this.contactRepository.delete(id);
  }
}
