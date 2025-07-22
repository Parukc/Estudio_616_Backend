import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from './gallery.schema';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
  ) {}

  create(data: Partial<Gallery>): Promise<Gallery> {
    const created = new this.galleryModel(data);
    return created.save();
  }

  findAll(): Promise<Gallery[]> {
    return this.galleryModel.find().exec();
  }

  findByProject(projectId: number): Promise<Gallery[]> {
    return this.galleryModel.find({ projectId }).exec();
  }

  delete(id: string): Promise<Gallery | null> {
    return this.galleryModel.findByIdAndDelete(id).exec();
  }
}
