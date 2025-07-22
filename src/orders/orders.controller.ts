import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() body: Partial<Order>) {
    return this.ordersService.create(body);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }
}
