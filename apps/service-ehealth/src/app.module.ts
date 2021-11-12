// import './boilerplate.polyfill';
import '@libs/boilerplate.polyfill';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path, { join } from 'path';
import { contextMiddleware } from '@libs/middlewares';
import { ApiConfigService } from '@libs/shared/services/api-config.service';
import { SharedModule } from '@libs/shared/shared.module';
import { ThongTinLuotKhamModule } from './thongtinluotkham/thongtinluotkham.module';
import { ThongTinLuotKhamEntity } from './thongtinluotkham/thongtinluotkham.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';

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
      autoSchemaFile: 'C:\\Users\\HUNGLV-EMR\\Desktop\\NestJS\\EhealthNestjsGrapql\\apps\\service-ehealth\\schema.gql',
      playground: {
        cdnUrl: 'http://localhost:3001',
      },
      context: ({ req, connection }: IContextArgs) => ({
        req: { ...req, ...connection?.context },
      }),
    }),
    ThongTinLuotKhamModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),

    TypeOrmModule.forRootAsync({
      // name: 'db_EhealthRea_dev',
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => {
        // console.log(join(__dirname, '../../../../../../', 'public'));
        
        const configDB = { ...configService.typeOrmConfig };
        configDB.entities = [ThongTinLuotKhamEntity, UserEntity];
        return configDB;
      },
      inject: [ApiConfigService],
    }),

    // TypeOrmModule.forRootAsync({
    //   name: 'db_FAMILY_WRK',
    //   imports: [SharedModule],
    //   useFactory: (configService: ApiConfigService) => {
    //     {
    //       const configDB = {
    //         ...configService.typeOrmConfig,
    //       };
    //       configDB.database = 'FAMILY_WRK'; // config name database
    //       return configDB;
    //     }
    //   },
    //   inject: [ApiConfigService],
    // }),

    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        parserOptions: {
          path: path.join("C:\\Users\\HUNGLV-EMR\\Desktop\\NestJS\\EhealthNestjsGrapql\\libs\\i18n"),
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
