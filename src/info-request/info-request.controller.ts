import { Controller, Post, Get, Body } from '@nestjs/common';
import { InfoRequestService } from './info-request.service';
import { CreateInfoRequestDto } from './dto/create-info-request.dto';
import { InfoRequest } from './schemas/info-request.schema';

@Controller('info-request')
export class InfoRequestController {
  constructor(private readonly infoRequestService: InfoRequestService) {}

  @Post()
  async create(@Body() dto: CreateInfoRequestDto): Promise<InfoRequest> {
    return this.infoRequestService.create(dto);
  }

  @Get()
  async findAll(): Promise<InfoRequest[]> {
    return this.infoRequestService.findAll();
  }
}
