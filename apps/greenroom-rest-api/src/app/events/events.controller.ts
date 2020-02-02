import { Controller, Get, Post, Body } from '@nestjs/common';
import { Event } from '@parm/greenroom-interface';
import { EventsService } from './events.service';

const mockEvent: Event = {
  _type: 'event',
  date: 'May 06 at 8 pm',
  place: 'Casey Moore\'s',
  slots: [
    {
      comics: [
        { firstName: 'Patrick', lastName: 'Michaelsen', },
        { firstName: 'Patrick', lastName: 'Michaelsen', },
        { firstName: 'Patrick', lastName: 'Michaelsen', },
        { firstName: 'Patrick', lastName: 'Michaelsen', },
        { firstName: 'Patrick', lastName: 'Michaelsen', },
        { firstName: 'Patrick', lastName: 'Michaelsen', },
        { firstName: 'Patrick', lastName: 'Michaelsen', },
        { firstName: 'Patrick', lastName: 'Michaelsen', },
      ]
    },
    {
      comics: [
        { firstName: 'Patrick', lastName: 'Michaelsen', },
        { firstName: 'Patrick', lastName: 'Michaelsen', },
        { firstName: 'Patrick', lastName: 'Michaelsen', },
        { firstName: 'Patrick', lastName: 'Michaelsen', },
        { firstName: 'Patrick', lastName: 'Michaelsen', },
      ]
    },
    { comics: [] },
  ],
};

@Controller('v1/events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get('latest')
  async getLatest(): Promise<Event> {
    return await this.eventService.getLatest();
  }

  @Get()
  get(): Event {
    return mockEvent;
  }

  @Get('by-id/:id')
  getById(): Event {
    return mockEvent;
  }

  @Post()
  async create(@Body() dto: any) {
    return await this.eventService.create(dto);
  }
}
