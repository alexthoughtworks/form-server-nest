import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderSummary } from '../order/dto/order-summary.dto';
import { ProductSummary } from '../product/dto/product-summary.dto';

@Injectable()
export class EventService {
  constructor(@Inject('ORDER_SERVICE') private readonly client: ClientKafka) {}

  emitOrderSummary(orderSummary: OrderSummary) {
    this.client.emit('orders.summary', orderSummary);
  }

  emitProductSummary(productSummary: ProductSummary) {
    this.client.emit('products.summary', productSummary);
  }

  emitTestMessage() {
    this.client.emit('test', { hello: 'professor' });
  }
}
