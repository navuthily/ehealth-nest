import '@libs/boilerplate.polyfill';
import { CommonModule } from '@libs/common/scalar/common.module';
import { contextMiddleware } from '@libs/middlewares';
import { ApiConfigService } from '@libs/shared/services/api-config.service';
import { SharedModule } from '@libs/shared/shared.module';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path, { join } from 'path';
import { ModuleThanhVienEntity } from './moduleThanhVien/moduleThanhVien.entity';
import { ModuleThanhVienModule } from './moduleThanhVien/moduleThanhVien.module';

interface IHeadersContainer {
  headers?: Record<string, string>;
}
interface IContextArgs {
  req?: IHeadersContainer;
  connection?: { context: IHeadersContainer };
}

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(
        __dirname,
        '../../../../../../',
        'apps/schemas/schema-thanhvien.gpl',
      ),
      playground: {
        cdnUrl: `${process.env.SV_THANHVIEN_IP}:${process.env.SV_THANHVIEN_PORT}`,
      },
      context: ({ req, connection }: IContextArgs) => ({
        req: { ...req, ...connection?.context },
      }),
    }),

    ModuleThanhVienModule,
    CommonModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => {
        {
          const configDB = {
            ...configService.typeOrmConfig('SV_THANHVIEN_'),
          };
          configDB.entities = [ModuleThanhVienEntity];
          return configDB;
        }
      },
      inject: [ApiConfigService],
    }),

    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        parserOptions: {
          path: path.join(__dirname, '../../../../../../', 'libs/i18n'),
          watch: configService.isDevelopment,
        },
      }),
      imports: [SharedModule],
      parser: I18nJsonParser,
      inject: [ApiConfigService],
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
  }
}
