import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    const order = this.orderRepository.create(createOrderInput);
    return this.orderRepository.save(order);
  }

  async findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    return this.orderRepository.findOne(id);
  }

  async update(id: number, updateOrderInput: UpdateOrderInput) {
    await this.orderRepository.update(id, { ...updateOrderInput });
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new NotFoundException({ id });
    }
    return order;
  }

  async remove(id: number) {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new NotFoundException({ id });
    }
    await this.orderRepository.delete(order);
    return order;
  }
}
