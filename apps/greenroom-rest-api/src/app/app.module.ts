import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { EventRegistrationModule } from './event-registration/event-registration.module';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';

const url = 'mongodb://localhost:27017';

@Module({
  imports: [
    MongooseModule.forRoot(url),
    EventsModule,
    EventRegistrationModule,
  ],
  providers: [EmailService],
  controllers: [EmailController],
})
export class AppModule {} 