import { Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('v1/email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async send() {
    this.emailService.send();
  }

}
