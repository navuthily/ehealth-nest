import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';
import { GoiKhamChiTietAppBenhNhanLoaiKhamChiTietService } from './goikhamchitiet-appbenhnhan-loaikham-chitiet.service';

@ApiTags('quanly_appbenhnhan')
@Controller('quanly_appbenhnhan')
export class GoiKhamChiTietAppBenhNhanLoaiKhamChiTietController {
  constructor(
    private quanlyAppbenhnhanService: GoiKhamChiTietAppBenhNhanLoaiKhamChiTietService,
    @InjectQueue('quanly_appbenhnhan') private readonly quanly_appbenhnhanQueue: Queue,
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
  @Get('updateGoiKhamStuff/:id')
  async updateGoiKhamStuff(@Param('id') id_loaikham: number) {
    const dataSQL = await this.quanlyAppbenhnhanService.getGoiKhamStuff(id_loaikham);
    const dataGroup = this.quanlyAppbenhnhanService.groupGoiKham(dataSQL);
    dataGroup.forEach(item => {
      this.quanly_appbenhnhanQueue.add(
        'updateGoiKhamStuff',
        item
      );
    })
    return {};
  }
}

