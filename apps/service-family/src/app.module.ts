import '@libs/boilerplate.polyfill';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';
import { contextMiddleware } from '@libs/middlewares';
import { ApiConfigService } from '@libs/shared/services/api-config.service';
import { SharedModule } from '@libs/shared/shared.module';
import { SuatAnModule } from './suatan/suatan.module';
import { SuatAnEntity } from './suatan/suatan.entity';
import { join } from 'path';
import { CommonModule } from '@libs/common/scalar/common.module';
import { SuatAnChiTietModule } from './suatanchitiet/suatanchitiet.module';
import { SuatAnChiTietEntity } from './suatanchitiet/suatanchitiet.entity';
import { DMVatTuDTO } from './dmvt2/dto/dmvt2.dto';
import { DMVatTuEntity } from './dmvt2/dmvt2.entity';

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
        'apps/schemas/schema-family.gpl',
      ),
      playground: {
        cdnUrl: `${process.env.SV_FAMILY_IP}:${process.env.SV_FAMILY_PORT}`,
      },
      context: ({ req, connection }: IContextArgs) => ({
        req: { ...req, ...connection?.context },
      }),
    }),

    SuatAnModule,
    SuatAnChiTietModule,
    DMVatTuDTO,
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
            ...configService.typeOrmConfig('SV_FAMILY_'),
          };
          configDB.entities = [
            SuatAnEntity,
            SuatAnChiTietEntity,
            DMVatTuEntity,
          ];
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
