import { Controller, Get } from '@nestjs/common';
import { Event } from '@parm/greenroom-interface';

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
  @Get('latest')
  getLatest(): Event {
    return mockEvent;
  }

  @Get()
  get(): Event {
    return mockEvent;
  }

  @Get('by-id/:id')
  getById(): Event {
    return mockEvent;
  }
}
