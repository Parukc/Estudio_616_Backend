import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InfoRequestDocument = InfoRequest & Document;

@Schema({ timestamps: true })
export class InfoRequest {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  correo: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true })
  tipoProyecto: string;

  @Prop({ required: true })
  descripcion: string;
}

export const InfoRequestSchema = SchemaFactory.createForClass(InfoRequest);
