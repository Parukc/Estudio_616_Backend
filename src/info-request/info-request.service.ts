import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InfoRequest, InfoRequestDocument } from './schemas/info-request.schema';
import { CreateInfoRequestDto } from './dto/create-info-request.dto';

@Injectable()
export class InfoRequestService {
  constructor(
    @InjectModel(InfoRequest.name)
    private infoRequestModel: Model<InfoRequestDocument>,
  ) {}

  async create(dto: CreateInfoRequestDto): Promise<InfoRequest> {
    const created = new this.infoRequestModel(dto);
    return created.save();
  }

  async findAll(): Promise<InfoRequest[]> {
    return this.infoRequestModel.find().sort({ createdAt: -1 }).exec();
  }
}
