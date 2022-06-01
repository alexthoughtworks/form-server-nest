import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EventService } from './event/event.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventService: EventService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test-kafka')
  testKafka(): string {
    this.eventService.emitTestMessage();
    return 'done';
  }
}
