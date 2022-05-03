import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApiConfigService } from '@libs/shared/services/api-config.service';
import { SharedModule } from '@libs/shared/shared.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { decode } from 'jsonwebtoken';

import { GoogleNotificationModule } from './google-notification/google-notification.module';
import { LanguageThongtinbenhvienModule } from './language-thongtinbenhvien/language-thongtinbenhvien.module';

import { AuthModule } from './auth/auth.module';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';

import { ChucvuModule } from './chucvu/chucvu.module';
import { ChucvuEntity } from './chucvu/chucvu.entity';
import { ChucdanhEntity } from './chucdanh/chucdanh.entity';
import { ChucdanhModule } from './chucdanh/chucdanh.module';
import { DmtrinhdoEntity } from './dmtrinhdo/dmtrinhdo.entity';
import { DmtrinhdoModule } from './dmtrinhdo/dmtrinhdo.module';

import { DmloaitinhluongEntity } from './dmloaitinhluong/dmloaitinhluong.entity';
import { DmloaitinhluongModule } from './dmloaitinhluong/dmloaitinhluong.module';
import { DmnganhangModule } from './dmnganhang/dmnganhang.module';
import { DmnganhangEntity } from './dmnganhang/dmnganhang.entity';
import { DmdonviEntity } from './dmdonvi/dmdonvi.entity';
import { DmdonviModule } from './dmdonvi/dmdonvi.module';
import { DmbophanModule } from './dmbophan/dmbophan.module';
import { DmbophanEntity } from './dmbophan/dmbophan.entity';
import { DmphongbanEntity } from './dmphongban/dmphongban.entity';
import { DmphongbanModule } from './dmphongban/dmphongban.module';
import { DmloaikhoiModule } from './dmloaikhoi/dmloaikhoi.module';
import { DmloaikhoiEntity } from './dmloaikhoi/dmloaikhoi.entity';

import { NhanvienhopdongEntity } from './nhanvienhopdong/nhanvienhopdong.entity';
import { NhanvienhopdongModule } from './nhanvienhopdong/nhanvienhopdong.module';
import { DmloaihopdongEntity } from './dmloaihopdong/dmloaihopdong.entity';
import { DmloaihopdongModule } from './dmloaihopdong/dmloaihopdong.module';
import { ChuyenkhoaModule } from './chuyenkhoa/chuyenkhoa.module';
import { ChuyenkhoaEntity } from './chuyenkhoa/chuyenkhoa.entity';

import { PhamvichungchihanhngheEntity } from './phamvichungchihanhnghe/phamvichungchihanhnghe.entity';
import { PhamvichungchihanhngheModule } from './phamvichungchihanhnghe/phamvichungchihanhnghe.module';

import { LoaibangcapModule } from './loaibangcap/loaibangcap.module';
import { NhanvienbangcapModule } from './nhanvienbangcap/nhanvienbangcap.module';
import { LoaibangcapEntity } from './loaibangcap/loaibangcap.entity';
import { NhanvienbangcapEntity } from './nhanvienbangcap/nhanvienbangcap.entity';
import { TemplateHdModule } from './templatehd/templatehd.module';
import { TemplateHdEntity } from './templatehd/templatehd.entity';
// import { GetIDLoaiQuanHeQuanHeBenhNhanModule } from './idloaiquanhe-moiquanhebenhnhan/idloaiquanhe-moiquanhebenhnhan.module';
require('dotenv').config();

interface IHeadersContainer {
  headers?: Record<string, string>;
}
interface IContextArgs {
  req?: IHeadersContainer;
  connection?: { context: IHeadersContainer };
}

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    const payload = await decode(context.jwt);
    request.http.headers.set('x-user-id', payload);
  }
}

@Module({
  providers: [
    {
      provide: AuthenticatedDataSource,
      useValue: AuthenticatedDataSource,
    },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory: (AuthenticatedDataSource) => {
        return ({ name, url }) => new AuthenticatedDataSource({ url });
      },
      inject: [AuthenticatedDataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
class BuildServiceModule {}

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => {
        const configDB = { ...configService.typeOrmConfig('SV_EHEALTH_') };
        configDB.entities = [
          UserEntity,
          ChucvuEntity,
          ChucdanhEntity,
          DmtrinhdoEntity,

          DmloaitinhluongEntity,
          DmnganhangEntity,
          DmdonviEntity,
          DmbophanEntity,
          DmphongbanEntity,
          DmloaikhoiEntity,
          NhanvienhopdongEntity,
          DmloaihopdongEntity,
          ChuyenkhoaEntity,
          PhamvichungchihanhngheEntity,
          LoaibangcapEntity,
          NhanvienbangcapEntity,
          LoaibangcapEntity,
          NhanvienbangcapEntity,
          TemplateHdEntity,
        ];
        configDB.logging = true;
        return configDB;
      },
      inject: [ApiConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      name: 'SV_FAMILY_',
      useFactory: (configService: ApiConfigService) => {
        const configDB = { ...configService.typeOrmConfig('SV_FAMILY_') };
        configDB.entities = [];
        configDB.logging = true;
        return configDB;
      },
      inject: [ApiConfigService],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [SharedModule],
    //   name: 'SV_THANHVIEN_',
    //   useFactory: (configService: ApiConfigService) => {
    //     const configDB = { ...configService.typeOrmConfig('SV_THANHVIEN_') };
    //     configDB.entities = [
    //       DMlanguageEntity,
    //       DMlabelEntity,
    //       DMlabellanguageEntity,
    //     ];
    //     return configDB;
    //   },
    //   inject: [ApiConfigService],
    // }),
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

    ScheduleModule.forRoot(),
    UserModule,
    GoogleNotificationModule,

    LanguageThongtinbenhvienModule,

    AuthModule,
    ChucvuModule,
    ChucdanhModule,
    DmtrinhdoModule,
    DmloaitinhluongModule,
    DmnganhangModule,
    DmdonviModule,
    DmbophanModule,
    DmphongbanModule,
    DmloaikhoiModule,
    NhanvienhopdongModule,
    DmloaihopdongModule,
    ChuyenkhoaModule,
    PhamvichungchihanhngheModule,
    LoaibangcapModule,
    NhanvienbangcapModule,
    NhanvienbangcapModule,
    TemplateHdModule,
  ],
})
export class AppModule {}
