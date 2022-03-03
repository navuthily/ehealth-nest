import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { GD2DatLichOnlineService } from '../gd2_datlichonline/gd2_datlichonline.service';
import { ThongTinLuotKhamService } from './thongtinluotkham.service';

@ApiTags('thongtinluotkham')
@Controller('thongtinluotkham')
@Injectable()
export class ThongTinLuotKhamController {
  constructor(
    private thongtinluotkhamService: ThongTinLuotKhamService,
    private gd2DatLichOnlineService: GD2DatLichOnlineService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  @Get('luotkham/:id')
  async getThongTinLuotKhamByIdLuotKham(@Param('id') idLuotKham: number) {
    const dataThongTinLuotKham = await this.thongtinluotkhamService.getThongTinLuotKhamByIdLuotKham(idLuotKham);
    const dataKham = await this.thongtinluotkhamService.getKhamByIdLuotKham(idLuotKham);
    const dataDieuTriPhoiHop = await this.thongtinluotkhamService.getDieuTriPhoiHopByIdLuotKham(idLuotKham);
    const dataPhysio = await this.thongtinluotkhamService.getPhysioByIdLuotKham(idLuotKham);

    const thongTinLuotKham = {
      dataThongTinLuotKham,
      dataKham,
      dataDieuTriPhoiHop,
      dataPhysio
    }

    return thongTinLuotKham;
  }
  @Get('lichhenkham/luotkham/:id')
  async getThongTinLuotKhamLichHenKhamByIdLuotKham(@Param('id') idLuotKham: number) {
    const dataThongTinLuotKham = await this.thongtinluotkhamService.getThongTinLuotKhamByIdLuotKham(idLuotKham);
    const dataKham = await this.thongtinluotkhamService.getKhamByIdLuotKham(idLuotKham);
    const dataDieuTriPhoiHop = await this.thongtinluotkhamService.getDieuTriPhoiHopByIdLuotKham(idLuotKham);
    const dataPhysio = await this.thongtinluotkhamService.getPhysioByIdLuotKham(idLuotKham);
    const dataLichHenKham = await this.gd2DatLichOnlineService.getLichHenKhamByIdLuotkham(idLuotKham);

    const thongTinLuotKham = {
      dataThongTinLuotKham,
      dataLichHenKham,
      dataKham,
      dataDieuTriPhoiHop,
      dataPhysio
    }

    return thongTinLuotKham;
  }
}
