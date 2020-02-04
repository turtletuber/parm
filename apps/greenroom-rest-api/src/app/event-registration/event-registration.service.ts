import { EventRegistration } from '@parm/greenroom-interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class EventRegistrationService {
  constructor(@InjectModel(EventRegistration) private readonly model: Model<EventRegistration>) {}

  async create(dto: EventRegistration): Promise<EventRegistration> {
    const entity = new this.model(dto);
    return entity.save();
  }

  async getByQuery(query: Partial<EventRegistration>): Promise<Array<EventRegistration>> {
    return await this.model.find(query).exec();
  }

}
