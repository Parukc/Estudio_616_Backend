import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GalleryDocument = Gallery & Document;

@Schema()
export class Gallery {
  @Prop({ required: true })
  url: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  projectId?: number;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
