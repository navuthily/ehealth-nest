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
import { ChucvuModule } from './chucvu/chucvu.module';
import { ChucvuEntity } from './chucvu/chucvu.entity';
import { ChucdanhEntity } from './chucdanh/chucdanh.entity';
import { ChucdanhModule } from './chucdanh/chucdanh.module';
import { ThoihanhopdongModule } from './thoihanhopdong/thoihanhopdong.module';
import { ThoihanhopdongEntity } from './thoihanhopdong/thoihanhopdong.entity';
import { DmhopdongModule } from './dmhopdong/dmhopdong.module';
import { DmhopdongEntity } from './dmhopdong/dmhopdong.entity';
import { DmtrinhdoEntity } from './dmtrinhdo/dmtrinhdo.entity';
import { DmtrinhdoModule } from './dmtrinhdo/dmtrinhdo.module';
import { DmdantocModule } from './dmdantoc/dmdantoc.module';
import { DmdantocEntity } from './dmdantoc/dmdantoc.entity';
import { DmquoctichModule } from './dmquoctich/dmquoctich.module';
import { DmquoctichEntity } from './dmquoctich/dmquoctich.entity';
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
import { TinhtranghonnhanModule } from './tinhtranghonnhan/tinhtranghonnhan.module';
import { TinhtranghonnhanEntity } from './tinhtranghonnhan/tinhtranghonnhan.entity';
import { NhanvienhopdongEntity } from './nhanvienhopdong/nhanvienhopdong.entity';
import { NhanvienhopdongModule } from './nhanvienhopdong/nhanvienhopdong.module';
import { DmloaihopdongEntity } from './dmloaihopdong/dmloaihopdong.entity';
import { DmloaihopdongModule } from './dmloaihopdong/dmloaihopdong.module';
import { ChuyenkhoaModule } from './chuyenkhoa/chuyenkhoa.module';
import { ChuyenkhoaEntity } from './chuyenkhoa/chuyenkhoa.entity';
import { DmtinhthanhphoEntity } from './dmtinhthanhpho/dmtinhthanhpho.entity';
import { DmtinhthanhphoModule } from './dmtinhthanhpho/dmtinhthanhpho.module';
import { PhamvichungchihanhngheEntity } from './phamvichungchihanhnghe/phamvichungchihanhnghe.entity';
import { PhamvichungchihanhngheModule } from './phamvichungchihanhnghe/phamvichungchihanhnghe.module';
import { DiemthianhvanEntity } from './diemthianhvan/diemthianhvan.entity';
import { DiemthianhvanModule } from './diemthianhvan/diemthianhvan.module';
import { LoaibangcapModule } from './loaibangcap/loaibangcap.module';
import { NhanvienbangcapModule } from './nhanvienbangcap/nhanvienbangcap.module';
import { LoaibangcapEntity } from './loaibangcap/loaibangcap.entity';
import { NhanvienbangcapEntity } from './nhanvienbangcap/nhanvienbangcap.entity';
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
          ChucvuEntity, ChucdanhEntity,
          ThoihanhopdongEntity,
          DmhopdongEntity, DmtrinhdoEntity,
          DmdantocEntity, DmquoctichEntity,
          DmloaitinhluongEntity, DmnganhangEntity,
          DmdonviEntity, DmbophanEntity,
          DmphongbanEntity, DmloaikhoiEntity,TinhtranghonnhanEntity,
          NhanvienhopdongEntity,DmloaihopdongEntity,
          ChuyenkhoaEntity, DmtinhthanhphoEntity,
          PhamvichungchihanhngheEntity,DiemthianhvanEntity,
          LoaibangcapEntity, NhanvienbangcapEntity
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
    ThongTinLuotKhamModule,
    BenhAnNoiTruModule,    
    DMPhongBanModule,
    ThucDonModule,
    SuatAnModule,
    AuthModule,
    ChucvuModule,
    ChucdanhModule,
    ThoihanhopdongModule,
    DmhopdongModule, DmtrinhdoModule, 
    DmdantocModule, DmquoctichModule,
    DmloaitinhluongModule,DmnganhangModule,
    DmdonviModule, DmbophanModule,
    DmphongbanModule, DmloaikhoiModule,
    TinhtranghonnhanModule, 
    NhanvienhopdongModule, DmloaihopdongModule, 
    ChuyenkhoaModule, DmtinhthanhphoModule,
    PhamvichungchihanhngheModule,DiemthianhvanModule,
    LoaibangcapModule, NhanvienbangcapModule
  ],
})
export class AppModule {}
