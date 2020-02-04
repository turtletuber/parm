import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CalendarEventService } from '../events/events.service';
import { EventRegistrationDto } from '@parm/greenroom-dto';
import { EventRegistrationService } from './event-registration.service';
import { EventRegistration } from '@parm/greenroom-interface';

@Controller('v1/event-registration')
export class EventRegistrationController {
  constructor(
    private readonly eventService: CalendarEventService,
    private readonly eventRegistrationService: EventRegistrationService,
  ) { }

  @Post()
  async create(@Body() dto: EventRegistrationDto) {
    const maxSlots = 3;
    const maxComics = 8;
    const { eventId } = dto;
    const event = await this.eventService.getById(eventId);
    if (!event) {
      throw new HttpException({
        error: `CalendarEvent '${eventId}' does not exist.`
      }, HttpStatus.BAD_REQUEST);
    }
    if (dto.slot !== null) {
      throw new HttpException({
        error: `Selecting a specific slot is not currently supported.`
      }, HttpStatus.BAD_REQUEST);
    }
    const registrations = await this.eventRegistrationService.getByQuery({ eventId });
    const slots: { [slot: number]: EventRegistration[]} = {};
    registrations.forEach(r => {
      const { slot: index } = r;
      slots[index] = [...(slots[index] || []), r];
    });
    const slotIndex = Object.keys(slots)
      .map(n => parseInt(n, 10))
      .find(i => slots[i].length < maxComics + 1);
    if (slotIndex === undefined && Object.keys(slots).length > maxSlots) {
      throw new HttpException({
        error: `CalendarEvent '${eventId}' has no empty slots available.`
      }, HttpStatus.BAD_REQUEST);
    }
    dto.slot = slotIndex || registrations.length; 
    return await this.eventRegistrationService.create(dto);
  }

}
