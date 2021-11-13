import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import compression from 'compression';
import RateLimit from 'express-rate-limit';
import { LoggingInterceptor } from '@libs/interceptors/logging.interceptor';
import morgan from 'morgan';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@libs/filters/bad-request.filter';
import { QueryFailedFilter } from '@libs/filters/query-failed.filter';
import { setupSwagger } from '@libs/setup-swagger';
import { ApiConfigService } from '@libs/shared/services/api-config.service';
import { SharedModule } from '@libs/shared/shared.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';

export async function bootstrap(): Promise<NestFastifyApplication> {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: false },
  );

  app.use(
    RateLimit({
      windowMs: 15 * 60 * 1000, // 15 minuteDs
      max: 1_000_000, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(compression());
  app.use(morgan('combined'));
  app.enableVersioning();

  Date.prototype.toJSON = function () {
    return this.valueOf();
  };

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
    new QueryFailedFilter(reflector),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  app.useStaticAssets({
    root: join(__dirname, '../../../', 'public'),
    prefix: '/',
  });
  const configService = app.select(SharedModule).get(ApiConfigService);

  // only start nats if it is enabled
  if (configService.natsEnabled) {
    const natsConfig = configService.natsConfig;
    app.connectMicroservice({
      transport: Transport.NATS,
      options: {
        url: `nats://${natsConfig.host}:${natsConfig.port}`,
        queue: 'main_service',
      },
    });

    await app.startAllMicroservices();
  }

  if (configService.documentationEnabled) {
    setupSwagger(app);
  }

  await app.listen(`${process.env.SV_FAMILY_PORT}`);

  return app;
}

void bootstrap();
