import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  items: string[]; // o un array de objetos { productoId, cantidad }

  @Prop({ default: 'pendiente' })
  estado: string; // pendiente, confirmado, cancelado

  @Prop()
  total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
