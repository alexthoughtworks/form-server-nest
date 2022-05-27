import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';

@Module({
  providers: [OrderResolver, OrderService],
  imports: [TypeOrmModule.forFeature([Order, OrderDetail])],
})
export class OrderModule {}
