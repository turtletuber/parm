import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { EventRegistrationModule } from './event-registration/event-registration.module';

const url = 'mongodb://localhost:27017';

@Module({
  imports: [
    MongooseModule.forRoot(url),
    EventsModule,
    EventRegistrationModule,
  ],
})
export class AppModule {} 