import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    const { createdOn, products } = createOrderInput;
    const order = await this.orderRepository.save({ createdOn });
    const promises = [];
    for (const { id, quantity } of products) {
      const detail = {
        quantity,
        product: { id },
        order,
      };
      promises.push(this.orderDetailRepository.save(detail));
    }
    await Promise.all(promises);
    const createdOrder = this.orderRepository.findOne(order.id, {
      relations: ['detail', 'detail.product'],
    });
    return createdOrder;
  }

  async findAll() {
    const orders = await this.orderRepository.find({
      relations: ['detail', 'detail.product'],
    });
    console.log(JSON.stringify(orders));
    return orders;
  }

  async findOne(id: number) {
    return this.orderRepository.findOne(id, {
      relations: ['detail', 'detail.product'],
    });
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
    await this.orderRepository.remove(order);
    return order;
  }
}
