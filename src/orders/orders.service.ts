import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  create(data: Partial<Order>) {
    const nueva = new this.orderModel(data);
    return nueva.save();
  }

  findAll() {
    return this.orderModel.find().exec();
  }

  findByUser(userId: number) {
    return this.orderModel.find({ userId }).exec();
  }

  updateEstado(id: string, estado: string) {
    return this.orderModel.findByIdAndUpdate(id, { estado }, { new: true }).exec();
  }

  delete(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
