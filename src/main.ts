import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();
const adapter = new ExpressAdapter(server);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter);

  app.enableCors({
    origin: ['http://localhost:8081', 'exp://192.168.15.9:8081'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.init();
}
bootstrap();

export default server;
