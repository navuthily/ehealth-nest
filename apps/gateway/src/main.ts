// import { NestFactory } from '@nestjs/core';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
// import * as admin from 'firebase-admin';
// import { ServiceAccount } from 'firebase-admin';
// import { join } from 'path';
// import { AppModule } from './app.module';
// import { LoggingInterceptor } from '@libs/interceptors/logging.interceptor';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import {
//   HttpStatus,
//   UnprocessableEntityException,
//   ValidationPipe,
// } from '@nestjs/common';
// import rateLimit from 'express-rate-limit';
// import {
//   initializeTransactionalContext,
//   patchTypeORMRepositoryWithBaseRepository,
// } from 'typeorm-transactional-cls-hooked';

// async function bootstrap(): Promise<NestFastifyApplication> {
//   initializeTransactionalContext();
//   patchTypeORMRepositoryWithBaseRepository();

//   const app = await NestFactory.create<NestFastifyApplication>(
//     AppModule,
//     new FastifyAdapter({
//       logger: {
//         file: '../../text.txt', // Will use pino.destination()
//       },
//     }),
//     // { cors: true },
//   );

//   // CẤP QUYỀN CHO FE

//   app.enableCors({
//     origin: true,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     credentials: true,
//   });

//   app.use(
//     rateLimit({
//       windowMs: 15 * 60 * 1000, // 15 minuteDs
//       max: 1_000_000, // limit each IP to 100 requests per windowMs
//     }),
//   );

//   const config = new DocumentBuilder()
//     .setTitle('APIs')
//     .setDescription('The APIs description')
//     .addBearerAuth()
//     .setVersion('1.0')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   app.useStaticAssets({
//     root: join(__dirname, '../../../../../../', 'public'),
//     prefix: '/',
//   });

//   app.useGlobalInterceptors(new LoggingInterceptor());

//   app.listen(`${process.env.PORT}` || 8000);
//   return app;
// }
// void bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('User authentication')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('user')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
    },
  });

  // app.enableCors();
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useStaticAssets(resolve('./dist/public'));
  //app.setGlobalPrefix('/api')
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('server on port', port);
}
bootstrap();
