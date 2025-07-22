import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true }) // ✅
  nombre: string;

  @Column({ nullable: true }) // ✅
  correo: string;

  @Column({ nullable: true }) // ✅
  mensaje: string;

  @Column({ nullable: true }) // ✅
  telefono: string;

  @CreateDateColumn()
  fecha: Date;

  @Column({ nullable: true })
  comentario: string;
}
