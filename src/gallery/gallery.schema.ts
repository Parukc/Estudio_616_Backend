import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GalleryDocument = Gallery & Document;

@Schema({ timestamps: true }) // 🕒 Agrega createdAt y updatedAt automáticamente
export class Gallery {
  @Prop({ required: true })
  url: string;

  @Prop({ default: '' }) // Opcional pero útil si algún día usas títulos
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop()
  projectId?: number;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
