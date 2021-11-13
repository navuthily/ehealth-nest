import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: false },
  );

  app.useStaticAssets({
    root: join(__dirname, '../../../', 'public'),
    prefix: '/',
  });
  // app.useStaticAssets('C:/Users/HUNGLV-EMR/Desktop/NestJS/EhealthNestjsGrapql/public/');
  await app.listen(3000);
}
void bootstrap();
