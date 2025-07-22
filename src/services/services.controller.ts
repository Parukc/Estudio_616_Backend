import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() body: Partial<Service>) {
    return this.servicesService.create(body);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Service>) {
    return this.servicesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
