import '@libs/boilerplate.polyfill';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { contextMiddleware } from '@libs/middlewares';
import { ApiConfigService } from '@libs/shared/services/api-config.service';
import { SharedModule } from '@libs/shared/shared.module';
import { ThongTinLuotKhamModule } from './thongtinluotkham/thongtinluotkham.module';
import { ThongTinLuotKhamEntity } from './thongtinluotkham/thongtinluotkham.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { DMBenhNhanModule } from './dmbenhnhan/dmbenhnhan.module';
import { DMBenhNhanEntity } from './dmbenhnhan/dmbenhnhan.entity';
import { CommonModule } from '@libs/common/scalar/common.module';
import { BenhAnGiuongBenhModule } from './BenhAnGiuongBenh/BenhAnGiuongBenh.module';
import { BenhAnGiuongBenhEntity } from './BenhAnGiuongBenh/BenhAnGiuongBenh.entity';
import { DMBuongGiuongBenhModule } from './DMBuongGiuongBenh/DMBuongGiuongBenh.module';
import { DMBuongGiuongBenhEntity } from './DMBuongGiuongBenh/DMBuongGiuongBenh.entity';

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
        'apps/schemas/schema-ehealth.gpl',
      ),
      playground: {
        cdnUrl: `${process.env.SV_EHEALTH_IP}:${process.env.SV_EHEALTH_PORT}`,
      },
      context: ({ req, connection }: IContextArgs) => {
        // console.log(req);

        // console.log(connection);

        return {
          req: { ...req, ...connection?.context },
        };
      },
    }),
    ThongTinLuotKhamModule,
    DMBenhNhanModule,
    BenhAnGiuongBenhModule,
    DMBuongGiuongBenhModule,
    AuthModule,
    UserModule,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => {
        const configDB = { ...configService.typeOrmConfig('SV_EHEALTH_') };
        configDB.entities = [
          ThongTinLuotKhamEntity,
          DMBenhNhanEntity,
          UserEntity,
          BenhAnGiuongBenhEntity,
          DMBuongGiuongBenhEntity,
        ];
        console.log(process.env.SV_EHEALTH_IP);

        return configDB;
      },
      inject: [ApiConfigService],
    }),

    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        parserOptions: {
          path: join(__dirname, '../../../../../../', 'libs/i18n'),
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
