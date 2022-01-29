import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GoiKhamChiTietAppBenhNhanLoaiKhamChiTietController } from './goikhamchitiet-appbenhnhan-loaikham-chitiet.controller';
import { GoiKhamChiTietAppBenhNhanLoaiKhamChiTietProcessor } from './goikhamchitiet-appbenhnhan-loaikham-chitiet.processor';
import { GoiKhamChiTietAppBenhNhanLoaiKhamChiTietService } from './goikhamchitiet-appbenhnhan-loaikham-chitiet.service';

// @Module({
//   providers: [XmlBHYTService],
// })
@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'quanly_appbenhnhan',
    }),
  ],
  controllers: [GoiKhamChiTietAppBenhNhanLoaiKhamChiTietController],
  providers: [GoiKhamChiTietAppBenhNhanLoaiKhamChiTietService, GoiKhamChiTietAppBenhNhanLoaiKhamChiTietProcessor],
})
export class GoiKhamChiTietAppBenhNhanLoaiKhamChiTietModule { }
