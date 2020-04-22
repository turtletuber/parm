import { Injectable } from '@nestjs/common';
import * as sendGrid from '@sendgrid/mail';
import { sendgrid } from '@parm/util';

@Injectable()
export class EmailService {
  public send() {
    // using SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    sendGrid.setApiKey(sendgrid.apiKey);
    const msg = {
      to: 'michaelsenpatrick@gmail.com',
      from: 'test@example.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sendGrid.send(msg);
  }
}
