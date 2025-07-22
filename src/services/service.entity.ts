import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  imagen: string; // Puedes almacenar una URL de imagen o base64
}
