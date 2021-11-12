import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: false },
  );
  app.useStaticAssets('public');
  // app.useStaticAssets('C:/Users/HUNGLV-EMR/Desktop/NestJS/EhealthNestjsGrapql/public/');
  await app.listen(3000);
}
void bootstrap();
