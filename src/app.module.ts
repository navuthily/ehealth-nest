import './boilerplate.polyfill';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
// import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'common/scalar/common.module';
import { PhieuXuatNoiBoModule } from 'modules/phieuxuatnoibo/phieuxuatnoibo.module';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';

import { contextMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { DMBenhNhanModule } from './modules/dm-benhnhan/dm-benhnhan.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { PostModule } from './modules/post/post.module';
import { ThongTinLuotKhamModule } from './modules/thongtinluotkham/thongtinluotkham.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from 'modules/user/user.module';

interface IHeadersContainer {
  headers?: Record<string, string>;
}
interface IContextArgs {
  req?: IHeadersContainer;
  connection?: { context: IHeadersContainer };
}

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: {
        cdnUrl: 'http://localhost:3000',
      },
      context: ({ req, connection }: IContextArgs) => ({
        req: { ...req, ...connection?.context },
      }),
    }),
    // Define Module
    AuthModule,
    UserModule,
    PostModule,
    DMBenhNhanModule,
    ThongTinLuotKhamModule,
    PhieuXuatNoiBoModule,
    CommonModule,
    //
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.typeOrmConfig,
      inject: [ApiConfigService],
    }),

    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        parserOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: configService.isDevelopment,
        },
      }),
      imports: [SharedModule],
      parser: I18nJsonParser,
      inject: [ApiConfigService],
    }),
    HealthCheckerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
  }
}
