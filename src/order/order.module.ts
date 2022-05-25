import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Module({
  providers: [OrderResolver, OrderService],
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrderModule {}
