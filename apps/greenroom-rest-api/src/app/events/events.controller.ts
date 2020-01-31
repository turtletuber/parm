import { Controller, Get } from '@nestjs/common';
import { Slot } from '@parm/greenroom-interface';

@Controller('events')
export class EventsController {
  @Get()
  get(): Slot {
    return { comics: [] };
  }

  @Get('by-id/:id')
  getById(): Slot {
    return { comics: [] };
  }

  @Get('latest')
  getLatest(): Slot {
    return { comics: [] };
  }
}
