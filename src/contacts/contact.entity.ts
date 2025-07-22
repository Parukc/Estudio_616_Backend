import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  mensaje: string;

  @Column()
  telefono: string;

  @CreateDateColumn()
  fecha: Date; // Esta es la línea que estabas preguntando

  @Column({ nullable: true })
  comentario: string;
}
