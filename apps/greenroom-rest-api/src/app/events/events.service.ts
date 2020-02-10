import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '@parm/greenroom-interface';

@Injectable()
export class CalendarEventService {
  constructor(@InjectModel(Event) private readonly model: Model<Event & Document>) {}

  async create(dto: Event): Promise<Event> {
    const entity = new this.model(dto);
    return entity.save();
  }

  async update(dto: Event): Promise<Event> {
    return this.model.updateOne(
      { _id: (dto as any)._id },
      dto
    ).exec();
  }

  async getLatest(): Promise<Event> {
    return this.model.findOne().exec();
  }

  async getById(id: String): Promise<Event> {
    return this.model.findById(id).exec();
  }
}
