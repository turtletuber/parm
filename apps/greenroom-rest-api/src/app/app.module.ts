import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';

const url = 'mongodb://localhost:27017';

@Module({
  imports: [
    MongooseModule.forRoot(url),
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
