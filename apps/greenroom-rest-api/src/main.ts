/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { facebook as facebookSecrets } from '@parm/util';
var fbsdk = require('facebook-sdk');
var facebook = new fbsdk.Facebook(facebookSecrets);
facebook.api(`/${facebookSecrets.appId}`, function(data) {
  console.log(data);
}); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  }));
  app.enableCors();
  const port = process.env.port || 3333;

  // Configure swagger per 
  // https://docs.nestjs.com/recipes/swagger 
  const options = new DocumentBuilder()
    .setTitle('greenroom-rest-api')
    .setDescription('Greenroom API')
    .setVersion('1.0')
    .addTag('greenroom')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);  

  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
