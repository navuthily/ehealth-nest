import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { join } from 'path';
import { AppModule } from './app.module';
import { LoggingInterceptor } from '@libs/interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import rateLimit from 'express-rate-limit';

async function bootstrap(): Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        file: '../../text.txt', // Will use pino.destination()
      },
    })
    // { cors: true },
  )

  // CẤP QUYỀN CHO FE

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minuteDs
      max: 1_000_000, // limit each IP to 100 requests per windowMs
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('APIs')
    .setDescription('The APIs description')
    .setVersion('1.0')
    .build();
    // .setTitle('Cats example')
    // .setDescription('The cats API description')
    // .setVersion('1.0')
    // .addBearerAuth()
    // .addTag('cats')
    // .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets({
    root: join(__dirname, '../../../../../../', 'public'),
    prefix: '/',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  // app
  //   .getHttpAdapter()
  //   .getInstance()
  //   .addHook('onRoute', (opts) => {
  //     console.log(opts.url);
  //   });
  app.useGlobalInterceptors(new LoggingInterceptor());
  const serviceAccount: ServiceAccount = {
    projectId: 'nhaxe-b3567',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDaxjCLJc6isyqH\n4S/WJ77Y3YECYlXgd//cUqiR8lZK/PsB9gX5BzBwR/MNXl9OHZvnF2hbQcvyth+Z\nE5ZG4gtj6QMY4UoCKYIwkjrHSngBN3q1GDGaZ+WEnoF384BANvHeetlLgY4tAkOW\ncnm9A8U+ZXrxW5Yr2pMHoOoLotxej5k6o3NVBlpqMgu0XO4ncXK49lUeR+mqjxVR\nRqbn9vzldG9Cdop42tZdwqkRID2/k/7VNRC22fM0Q1Y8PapL7E1uuU/kf7HKgaUn\netyKivUL8QsgQ5AdiSiFaoCX4SOk5W6z24tEQdojkuQkJB7PLMdXTS4OIMcmDrqM\nLXneHR0hAgMBAAECggEAAWSY+DdXgOGiuQiS/a5NSr+jDc4dC22/K8as1ShPomjI\nwzwHEOVB2qqqHHsGAMMLcDvV47wcG5ubURXq32Daw0YvYWUEk+XCUvto33ZI5CLX\nk6Prs67C+1KYKuCif8IrzUOfauGwY1bqAdEQ924o3zE9qJARgU4qEM62c8hTxnA5\nCyArN00MUxBZvVkm3h1+nSnYduZSxUrH8kcgVG1YJ6tSjfPJBQTFcKY7hhIg5JWD\nnKISwPCUkQX+KSjKuzvtCEOt/ICfoL4laEsgwhm2TtCKOY3rxnqVprLDdkwk8TmK\nagvOSdVqD/8WJx0XLvQ/fcSJKQVyjTf1ekEpLmo2gQKBgQD+6z78wLVxzBObUJs7\nfPqSvAg2YggseXr/MwqvqnTcHrLmnpHKxxldPPv6qPV+qI/+lejcadfI2NqXn6yw\nqwhAyfkZcoe94fq1Z/yPCT3DfzxkVgoOzAFmKoD5XKZ/9SdGfdq6YvtXdoL/dJv0\n462WrBvY772IpOtjtRCyrq2soQKBgQDbs7PuZuiiJn65lJOwAn1UVw/mGuBol7/p\nERhps3X/3o/bVPJlq1PMRFlL2cf1KHE3lRe0dK5EIwvXJ2YKPAIyS4yLYRZp0dn0\nLOdjvQU9plX1Fj81MQY7Yp0z/Rrb5tB+7c07AXl+iDzWDMSfJZJbZJEQEMRmafje\nWWoUV+UggQKBgF1MWCdFmKLnoB1uKQJiwYrGyvKsenVcmMmiMr0MU+zkR3Hkg1OF\n/yCC225oPEF5DAqPb0SMcG+P/qETza5zSnf78/F+W3QBqzKNtn/bUAGnJcFLRC8a\nN0DfOYkKgd2/KfrAwTcKVxcxxswcL6A3XCcTIrYJOIM0aPp7IHtlNydBAoGAdgFq\n1tVdhKLKlGFyhiqAKMnulzi+ak9/2+67vyKOcdWYTUWuQN+qTeA0WmJqXYrQbPte\n1SWK6LwuQu09iKe8wkkD/2Uxhbsap2VrD45af0eViePeJXLklwcbyu3a/FxYhqSy\nBEyBdm40xv/qqFSk7QPySr/Gzf+DleJO8QhY4IECgYApltzdbM7+PMVo9GWPnTLn\nyV2223nruD+fqapIjeLdTQ9b+MZdBzpXSAQ6MutYq/w9Z9sQf9qRIDXWqrErRKru\nttXGo3GOJmdRSMhBceWiNaQKC0JM5N4t7mTGMu9ZuJOowHEeWOMjNUp0A5ShOgn1\noF+XgRFGl8J+BMmSEa2x9g==\n-----END PRIVATE KEY-----\n',
    clientEmail: 'firebase-adminsdk-3374h@nhaxe-b3567.iam.gserviceaccount.com',
  };

  const b = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nhaxe-b3567.firebaseio.com',
  });
  app.listen(`${process.env.SV_GATEWAY_PORT}`, '0.0.0.0');
  return app;
}
void bootstrap();
