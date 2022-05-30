import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class EventService {
  constructor(@Inject('ORDER_SERVICE') private readonly client: ClientKafka) {}

  emitNewOrder() {
    this.client.emit('orders.test', { hello: 'professor' });
  }
}
