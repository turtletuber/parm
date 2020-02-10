import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CalendarEventService } from '../events/events.service';
import { EventRegistrationDto } from '@parm/greenroom-dto';
import { EventRegistrationService } from './event-registration.service';
import { EventRegistration, Slot, Event } from '@parm/greenroom-interface';
import { not } from '@parm/util';

const maxSlots = 3;
const maxComics = 8;

const isEmailSameAs =
  (b: EventRegistration) =>
    (a: EventRegistration) =>
      a.email === b.email
      && a.eventId === b.eventId
  ;

const isSameAs =
  (b: EventRegistration) =>
    (a: EventRegistration) =>
      a.firstName === b.firstName
      && a.lastName === b.lastName
      && a.eventId === b.eventId
  ;

const isSlotFull = (slot: Slot) =>
  slot.comics.length > maxComics - 1;

const isEverySlotFull = (event: Event) =>
  event.slots.every(isSlotFull);

const isEventFull = (event: Event) =>
  event.slots.length > maxSlots - 1;

@Controller('v1/event-registration')
export class EventRegistrationController {
  constructor(
    private readonly eventService: CalendarEventService,
    private readonly eventRegistrationService: EventRegistrationService,
  ) { }

  @Post()
  async create(@Body() dto: EventRegistrationDto) {
    const { eventId } = dto;
    const event = await this.eventService.getById(eventId);
    if (!event) {
      throw new HttpException({
        error: `CalendarEvent '${eventId}' does not exist.`
      }, HttpStatus.BAD_REQUEST);
    }
    event.slots = event.slots || [];
    for (let i = 0; event.slots.length < maxSlots; i++) {
      event.slots[i] = event.slots[i] || {
        _type: 'slot',
        order: i,
        comics: [],
      };
    }
    if (isEventFull(event) && isEverySlotFull(event)) {
      throw new HttpException({
        error: `The event is full.`
      }, HttpStatus.BAD_REQUEST);
    }
    if (dto.order !== null) {
      throw new HttpException({
        error: `Selecting a specific slot is not currently supported.`
      }, HttpStatus.BAD_REQUEST);
    }
    const registrations = await this.eventRegistrationService.getByQuery({ eventId });
    if (registrations.some(isEmailSameAs(dto))) {
      throw new HttpException({
        error: `Someone has already registered using that email.`
      }, HttpStatus.BAD_REQUEST);
    }
    if (registrations.some(isSameAs(dto))) {
      throw new HttpException({
        error: `Please register using a different name, as that name is taken.`
      }, HttpStatus.BAD_REQUEST);
    }
    const slot = event.slots.find(not(isSlotFull));
    if (slot === undefined) {
      throw new HttpException({
        error: `No free slot was not found.`
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    dto.order = null;
    const { firstName, lastName, order } = dto;
    slot.comics.push({
      _type: 'comic',
      order,
      firstName,
      lastName,
    });
    await this.eventService.update(event);
    return await this.eventRegistrationService.create(dto);
  }
} 