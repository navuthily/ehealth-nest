import '@libs/boilerplate.polyfill';
import { CommonModule } from '@libs/common/scalar/common.module';
import { contextMiddleware } from '@libs/middlewares';
import { ApiConfigService } from '@libs/shared/services/api-config.service';
import { SharedModule } from '@libs/shared/shared.module';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { BenhAnGiuongBenhEntity } from './BenhAnGiuongBenh/BenhAnGiuongBenh.entity';
import { BenhAnGiuongBenhModule } from './BenhAnGiuongBenh/BenhAnGiuongBenh.module';
import { DMLoaiKhamEntity } from './dm-loaikham/dm-loaikham.entity';
import { DMLoaiKhamModule } from './dm-loaikham/dm-loaikham.module';
import { DMModuleLoaiKhamEntity } from './dm-loaikham/dm-module-loaikham.entity';
import { DMLoiKhuyenEntity } from './dm-loikhuyen/dm-loikhuyen.entity';
import { DMLoiKhuyenModule } from './dm-loikhuyen/dm-loikhuyen.module';
import { DMBenhNhanEntity } from './dmbenhnhan/dmbenhnhan.entity';
import { DMBenhNhanModule } from './dmbenhnhan/dmbenhnhan.module';
import { DMBuongGiuongBenhEntity } from './DMBuongGiuongBenh/DMBuongGiuongBenh.entity';
import { DMBuongGiuongBenhModule } from './DMBuongGiuongBenh/DMBuongGiuongBenh.module';
import { ThongTinLuotKhamEntity } from './thongtinluotkham/thongtinluotkham.entity';
import { ThongTinLuotKhamModule } from './thongtinluotkham/thongtinluotkham.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { DmlabelEntity } from './dm-label/dm-label.entity';
import { DMLabelModule } from './dm-label/dm-label.module';
import { DmLanguageEntity } from './dm-language/dm-language.entity';
import { DMLanguageModule } from './dm-language/dm-language.module';
import { ThongTinBenhVienEntity } from './thongtinbenhvien/thongtinbenhvien.entity';
import { ThongTinBenhVienModule } from './thongtinbenhvien/thongtinbenhvien.module';
import { DmLabelLanguageEntity } from './dm-label-language/dm-label-language.entity';
import { DMLabelLanguageModule } from './dm-label-language/dm-label-language.module';
import { MoiQuanHeBenhNhanEntity } from './benhnhan-quanhe/benhnhan-quanhe.entity';
import { MoiQuanHeBenhnhanModule } from './benhnhan-quanhe/benhnhan-quanhe.module';
import { dmloaikhamToModuleLoader } from './dm-loaikham/loader/loaikhamToModuleLoaikham.loader';
import { dmloaikhamToLoikhuyenLoader } from './dm-loaikham/loader/loaikhamToLoikhuyen.loader';
import { DMModuleLoaiKham } from './dm-loaikham/dm-module-loaikham.module';
import { moduleLoaiKhamToModuleNameLoader } from './dm-loaikham/loader/moduleLoaikhamToModuleName.loader';
import { DMLoaikhamService } from './dm-loaikham/dm-loaikham.service'

interface IHeadersContainer {
  headers?: Record<string, string>;
}
interface IContextArgs {
  req?: IHeadersContainer;
  connection?: { context: IHeadersContainer };
}

@Module({
  imports: [
    GraphQLFederationModule.forRootAsync({
      // autoSchemaFile: join(
      //   __dirname,
      //   '../../../../../../',
      //   'apps/schemas/schema-ehealth.gpl',
      // ),
 
      // playground: {
      //   cdnUrl: `${process.env.SV_EHEALTH_IP}:${process.env.SV_EHEALTH_PORT}`,
      // },
    
      // context: ({ req, connection }: IContextArgs) => {
      //   // console.log(req);

      //   // console.log(connection);

      //   return {
      //     dmloaikhamToModuleLoader: dmloaikhamToModuleLoader(),
      //     dmloaikhamToLoikhuyenLoader: dmloaikhamToLoikhuyenLoader(),
      //     moduleLoaiKhamToModuleNameLoader: moduleLoaiKhamToModuleNameLoader(),
      //     req: { ...req, ...connection?.context },
      //   };
      // },
      imports: [DMLoaiKhamModule,DMModuleLoaiKham],
      useFactory: (service: DMLoaikhamService) => ({
        playground: {
          cdnUrl: `${process.env.SV_EHEALTH_IP}:${process.env.SV_EHEALTH_PORT}`,
        },
        autoSchemaFile: join(
          __dirname,
          '../../../../../../',
          'apps/schemas/schema-ehealth.gpl',
        ),
        context: () => ({
          dmloaikhamToModuleLoader: dmloaikhamToModuleLoader(),
          dmloaikhamToLoikhuyenLoader: dmloaikhamToLoikhuyenLoader(),
          moduleLoaiKhamToModuleNameLoader: moduleLoaiKhamToModuleNameLoader(service),
        }),
      }),
      inject: [DMLoaikhamService],


      


    }),




    ThongTinLuotKhamModule,
    DMBenhNhanModule,
    BenhAnGiuongBenhModule,
    DMBuongGiuongBenhModule,
    AuthModule,
    // UserModule,
    CommonModule,
    DMLoaiKhamModule,
    DMLoiKhuyenModule,
    DMLabelModule,
    DMLanguageModule,
    ThongTinBenhVienModule,
    DMLabelLanguageModule,
    MoiQuanHeBenhnhanModule,
    DMModuleLoaiKham,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),


    // GraphQLModule.forRootAsync({
    //     imports: [],
    //     inject: []
    // }),

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
          DMLoaiKhamEntity,
          DMLoiKhuyenEntity,
          DMModuleLoaiKhamEntity,
          DmlabelEntity,
          DmLanguageEntity,
          ThongTinBenhVienEntity,
          DmLabelLanguageEntity,
          MoiQuanHeBenhNhanEntity
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
