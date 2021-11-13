import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import {FastifyJWT} from 'fastify-jwt';
// require('dotenv').config()

async function bootstrap():  Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: false },
  );

  app.useStaticAssets({
    root: join(__dirname, '../../../', 'public'),
    prefix: '/',
  });

  app.listen(`${process.env.SV_GATEWAY_PORT}`);
  return app;
}
void bootstrap();
