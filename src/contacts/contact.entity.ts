import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  message: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  comentario?: string;

  @CreateDateColumn()
  createdAt: Date;
}
