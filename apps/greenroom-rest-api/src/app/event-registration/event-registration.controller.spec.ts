import { Test, TestingModule } from '@nestjs/testing';
import { EventRegistrationController } from './event-registration.controller';

describe('EventRegistration Controller', () => {
  let controller: EventRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventRegistrationController],
    }).compile();

    controller = module.get<EventRegistrationController>(EventRegistrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
