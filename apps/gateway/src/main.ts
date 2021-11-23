import { NestFactory } from '@nestjs/core';
import { LoggingInterceptor } from '@libs/interceptors/logging.interceptor';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { FastifyJWT } from 'fastify-jwt';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';
// var serviceAccount = require('../../nhaxe.json');
// require('dotenv').config()

async function bootstrap(): Promise<NestFastifyApplication> {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: false },
  );

  app.useStaticAssets({
    root: join(__dirname, '../../../../../../', 'public'),
    prefix: '/',
  });

  // app
  //   .getHttpAdapter()
  //   .getInstance()
  //   .addHook('onRoute', (opts) => {
  //     console.log(opts.url);
  //   });
  // app.useGlobalInterceptors(new LoggingInterceptor());
  app.listen(`${process.env.SV_GATEWAY_PORT}`, '0.0.0.0');
  return app;
}
void bootstrap();
