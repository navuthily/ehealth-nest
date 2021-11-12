import '@libs/boilerplate.polyfill';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';
import { contextMiddleware } from '@libs/middlewares';
import { ApiConfigService } from '@libs/shared/services/api-config.service';
import { SharedModule } from '@libs/shared/shared.module';
import { Posph66EhModule } from './pos$ph66-eh/pos$ph66-eh.module';
import { Posph66EhEntity } from './pos$ph66-eh/pos$ph66-eh.entity';

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
      autoSchemaFile: 'C:\\Users\\HUNGLV-EMR\\Desktop\\NestJS\\EhealthNestjsGrapql\\apps\\service-family\\schema.gql',
      playground: {
        cdnUrl: 'http://localhost:3002',
      },
      context: ({ req, connection }: IContextArgs) => ({
        req: { ...req, ...connection?.context },
      }),
    }),

    Posph66EhModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),

    // TypeOrmModule.forRootAsync({
    //   name: 'db_EhealthRea_dev', // Bỏ qua dòng này thì sẽ là db mặc định
    //   imports: [SharedModule],
    //   useFactory: (configService: ApiConfigService) =>
    //     configService.typeOrmConfig,
    //   inject: [ApiConfigService],
    // }),

   
    TypeOrmModule.forRootAsync({
      // name: 'db_FAMILY_WRK',
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => {
        {
          const configDB = {
            ...configService.typeOrmConfig,
          };
          configDB.database = 'FAMILY_WRK';
          configDB.entities=[Posph66EhEntity]
          return configDB;
        }
      },
      inject: [ApiConfigService],
    }),
    
    // GraphQLFederationModule.forRoot({
    //   autoSchemaFile: 'C:\\Users\\HUNGLV-EMR\\Desktop\\NestJS\\EhealthNestjsGrapql\\apps\\service-family\\schema.gql',
    // }),
    
    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        parserOptions: {
          path: path.join('C:\\Users\\HUNGLV-EMR\\Desktop\\NestJS\\EhealthNestjsGrapql\\libs\\i18n'),
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
