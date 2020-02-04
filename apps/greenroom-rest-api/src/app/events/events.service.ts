import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventRegistration } from '@parm/greenroom-interface';

@Injectable()
export class CalendarEventService {
  constructor(@InjectModel(Event) private readonly model: Model<Event>) {}

  async create(dto: Event): Promise<Event> {
    const entity = new this.model(dto);
    return entity.save();
  }

  async register(dto: EventRegistration) {
    const {
      eventId, firstName, lastName
    } = dto;
    const event: Event = await this.model.findById(eventId).exec();
    console.log(event);
    let slot = event.slots.find(slot => slot.comics.length < 8);
    if (!slot && event.slots.length < 3) {
      slot = { _type: 'slot', comics: [] };
      event.slots.push(slot);
    }
    slot.comics.push({
      firstName, lastName, _type: 'comic'
    });
    return 0;
    // const entity = this.model.up;
    // return entity.save();
  }

  async getLatest(): Promise<Event> {
    return this.model.findOne().exec();
  }

  async getById(id: String): Promise<Event> {
    return this.model.findById(id).exec();
  }
}
