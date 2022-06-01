import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventService } from './event.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ORDER_SERVICE',
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'order',
                brokers: configService.get<string[]>('kafkaBrokers'),
              },
              consumer: {
                groupId: 'order-consumer',
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
