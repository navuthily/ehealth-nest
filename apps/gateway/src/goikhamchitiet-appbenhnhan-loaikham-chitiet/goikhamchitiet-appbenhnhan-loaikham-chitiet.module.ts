import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GoiKhamChiTietAppBenhNhanLoaiKhamChiTietController } from './goikhamchitiet-appbenhnhan-loaikham-chitiet.controller';
import { GoiKhamChiTietAppBenhNhanLoaiKhamChiTietService } from './goikhamchitiet-appbenhnhan-loaikham-chitiet.service';

// @Module({
//   providers: [XmlBHYTService],
// })
@Module({
  imports: [
    HttpModule,
  ],
    controllers: [GoiKhamChiTietAppBenhNhanLoaiKhamChiTietController],
  providers: [GoiKhamChiTietAppBenhNhanLoaiKhamChiTietService],
})
export class GoiKhamChiTietAppBenhNhanLoaiKhamChiTietModule {}
