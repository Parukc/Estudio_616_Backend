import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() order: Partial<Order>) {
    return this.ordersService.create(order);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.ordersService.findByUser(Number(userId));
  }

  @Put(':id')
  updateEstado(@Param('id') id: string, @Body('estado') estado: string) {
    return this.ordersService.updateEstado(id, estado);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }
}
