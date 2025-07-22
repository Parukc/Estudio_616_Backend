import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  create(data: Partial<Order>) {
    const created = new this.orderModel(data);
    return created.save();
  }

  findAll() {
    return this.orderModel.find().exec();
  }

  delete(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
