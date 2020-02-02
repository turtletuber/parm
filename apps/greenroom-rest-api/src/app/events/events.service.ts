import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '@parm/greenroom-interface';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event) private readonly model: Model<Event>) {}

  async create(dto: Event): Promise<Event> {
    const entity = new this.model(dto);
    return entity.save();
  }

  async getLatest(): Promise<Event> {
    return this.model.findOne().exec();
  }
}
