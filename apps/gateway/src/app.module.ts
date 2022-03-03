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
import { DanhSachCanLamSangModule } from './danhsachcanlamsang/danhsachcanlamsang.module';
import { DanhSachLamSangModule } from './danhsachlamsang/danhsachlamsang.module';
import { DMLoaiKhamModule } from './dmloaikham/dmloaikham.module';
import { GoogleNotificationModule } from './google-notification/google-notification.module';
import { ThuocModule } from './thuoc/thuoc.module';
import { XmlBHYTModule } from './xml-bhyt/xml-bhyt.module';
import { LanguageThongtinbenhvienModule } from './language-thongtinbenhvien/language-thongtinbenhvien.module';
import { LienKetMoiQuanHeBenhNhanModule } from './lienket-moiquanhebenhnhan/lienket-moiquanhebenhnhan.module';
import { GoiKhamChiTietAppBenhNhanLoaiKhamChiTietModule } from './goikhamchitiet-appbenhnhan-loaikham-chitiet/goikhamchitiet-appbenhnhan-loaikham-chitiet.module';
import { GoiKhamModule } from './goikham/goikham.module';
import { DMReportModule } from './dm_report/dm_report.module';
import { GD2DatLichOnlineModule } from './gd2_datlichonline/gd2_datlichonline.module';
import { ThongTinLuotKhamModule } from './thongtinluotkham/thongtinluotkham.module';
import { BenhAnNoiTruModule } from './benhannoitru/benhannoitru.module';
import { DMPhongBanModule } from './dm_phongban/dm_phongban.module';
import { ThucDonModule } from './thucdon/thucdon.module';
import { SuatAnModule } from './suatan/suatan.module';
import { AuthModule } from './auth/auth.module';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { SuatAn } from './suatan/suatan.entity';
import { ChiTietSuatAnModule } from './chitietsuatan/chitietsuatan.module';
import { ChiTietSuatAn } from './chitietsuatan/chitietsuatan.entity';
import { VatTu } from './vattu/vattu.entity';
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
class BuildServiceModule { }

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        gateway: {
          serviceList: [
            {
              name: 'SV_EHEALTH',
              url: `${process.env.SV_EHEALTH_IP}:${process.env.SV_EHEALTH_PORT}/graphql`,
            },
            {
              name: 'SV_FAMILY',
              url: `${process.env.SV_FAMILY_IP}:${process.env.SV_FAMILY_PORT}/graphql`,
            },
            {
              name: 'SV_THANHVIEN',
              url: `${process.env.SV_THANHVIEN_IP}:${process.env.SV_THANHVIEN_PORT}/graphql`,
            },
          ],
        },
        server: {
          context: ({ request }) => {
            return {
              jwt: request?.headers?.authorization,
            };
          },
          cors: false,
          plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({
              cdnUrl: `${process.env.SV_GATEWAY_IP}:${process.env.SV_GATEWAY_PORT}`,
            }),
          ],
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
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
  
        ];
        return configDB;
      },
      inject: [ApiConfigService],
    }),
    //---------------
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      name : "SV_FAMILY_",
      useFactory: (configService: ApiConfigService) => {
        const configDB = { ...configService.typeOrmConfig('SV_FAMILY_') };
        configDB.entities = [
        
          // UserEntity,
          SuatAn,ChiTietSuatAn, VatTu
  
        ];

        configDB.logging = true;
        return configDB;
      },
      inject: [ApiConfigService],
    }),

    // TypeOrmModule.forRootAsync({
    //   imports: [SharedModule],
    //   name : "ehealth_real_new12345",
    //   useFactory: (configService: ApiConfigService) => {
    //     const configDB = { ...configService.typeOrmConfig('ehealth_real_new12345') };
    //     configDB.entities = [
        
    //       UserEntity,
    //       SuatAn,ChiTietSuatAn, VatTu
  
    //     ];

    //     // configDB.logging = true;
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

    // SequelizeModule.forRoot({
    //   dialect: 'mssql',
    //   host: '192.168.1.107',
    //   port: 1433,
    //   username: 'dev',
    //   password: '1234',
    //   database: 'EhealthRea_dev',
    //   models: [],
    //   pool:{
    //     max:5,
    //     min:0,
    //     acquire:30000,
    //     idle:10000
    //   }

    // }),

    ScheduleModule.forRoot(),
    UserModule,
    GoogleNotificationModule,
    XmlBHYTModule,
    ThuocModule,
    DanhSachLamSangModule,
    DanhSachCanLamSangModule,
    LanguageThongtinbenhvienModule,
    LienKetMoiQuanHeBenhNhanModule,
    DMLoaiKhamModule,
    LanguageThongtinbenhvienModule,
    GoiKhamChiTietAppBenhNhanLoaiKhamChiTietModule,
    GoiKhamModule,
    DMReportModule,
    GD2DatLichOnlineModule,
    ThongTinLuotKhamModule
  ],
})
export class AppModule { }

// @Module({
//   imports: [
//     GraphQLGatewayModule.forRoot({
//       server: {
//         // ... Apollo server options
//         debug: true,
//         cors: false,
//         plugins: [
//           ApolloServerPluginLandingPageGraphQLPlayground({
//             cdnUrl: `${process.env.SV_GATEWAY_IP}:${process.env.SV_GATEWAY_PORT}`,
//           }),
//           ApolloServerPluginInlineTrace(),
//         ],
//         context: ({ req }) => ({
//           jwt: req.headers.authorization,
//         }),
//       },
//       gateway: {
//         serviceList: [
//           {
//             name: 'thongtinluotkham',
//             // url: 'http://localhost:3001/graphql'
//             url: `${process.env.SV_EHEALTH_IP}:${process.env.SV_EHEALTH_PORT}/graphql`,
//           },
//           {
//             name: 'posph66EhH',
//             // url: 'http://localhost:3002/graphql'
//             url: `${process.env.SV_FAMILY_IP}:${process.env.SV_FAMILY_PORT}/graphql`,
//           },
//         ],
//       },
//     }),
//   ],
// })
// export class AppModule {}

    BenhAnNoiTruModule,    
    DMPhongBanModule,
    ThucDonModule,
    SuatAnModule,
    // ChiTietSuatAnModule,
    AuthModule,
  ],
})
export class AppModule {}
