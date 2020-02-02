import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event } from '@parm/greenroom-interface';
import { EventSchema } from './events.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event, schema: EventSchema }])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}