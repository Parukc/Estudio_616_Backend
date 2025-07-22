import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 🔐 Enum para los roles de usuario
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombres: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefono: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER, // valor por defecto para nuevos usuarios
  })
  role: UserRole;
}
