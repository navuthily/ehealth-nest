import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoiKhamChiTietAppBenhNhanLoaiKhamChiTietService } from './goikhamchitiet-appbenhnhan-loaikham-chitiet.service';

@ApiTags('quanly_appbenhnhan')
@Controller('quanly_appbenhnhan')
export class GoiKhamChiTietAppBenhNhanLoaiKhamChiTietController {
  constructor(
    private quanlyAppbenhnhanService: GoiKhamChiTietAppBenhNhanLoaiKhamChiTietService,
  ) { }

  @Post('goichidinhkham')
  async index(@Body() data: any) {
    const { id } = data;
    const result =
      await this.quanlyAppbenhnhanService.exec_GD2_GoiKhamChiTiet_AppBenhNhan_LoaiKham_ChiTiet(
        id
      );
    return result;
  }
}
