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
  @Post('modulegoikham')
  async show(@Body() data: any) {
    const { goikham_id,module_id } = data;
    const addModuleGoikham = await this.quanlyAppbenhnhanService.addModuleGoikham(goikham_id,module_id);
  }
  @Post('updatemodulegoikham')
  async up(@Body() data: any) {
    console.log(data);
    
    const { id,goikham_id,module_id } = data;
    const updateModuleGoikham = await this.quanlyAppbenhnhanService.updateModuleGoikham( id,goikham_id,module_id);
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