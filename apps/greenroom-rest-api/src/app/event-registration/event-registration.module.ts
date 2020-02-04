import { Module } from '@nestjs/common';
import { EventRegistrationController } from './event-registration.controller';
import { EventsModule } from '../events/events.module';
import { EventRegistrationService } from './event-registration.service';
import { EventRegistration } from '@parm/greenroom-interface';
import { MongooseModule } from '@nestjs/mongoose';
import { EventRegistrationSchema } from './event-registration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EventRegistration, schema: EventRegistrationSchema }]),
    EventsModule
  ],
  controllers: [EventRegistrationController],
  providers: [EventRegistrationService],
})
export class EventRegistrationModule {}
