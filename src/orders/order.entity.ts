// src/orders/order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // ID del usuario que hace el pedido

  @Column('json')
  items: any; // Puedes refinar esto luego como array de objetos

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn()
  fecha: Date;

  @Column({ default: 'pendiente' })
  estado: string; // pendiente, confirmado, cancelado
}
