import {
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Injectable,
  Param
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { GD2DatLichOnlineService } from './gd2_datlichonline.service';

@ApiTags('datlichonline')
@Controller('datlichonline')
@Injectable()
export class GD2DatLichOnlineController {
  constructor(
    private gd2DatLichOnlineService: GD2DatLichOnlineService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  @Get('lichhenkham/idbenhnhan/:id')
  async getLichHenKhamByIdBenhNhan(@Param('id') idBenhNhan: number) {
    const data = await this.gd2DatLichOnlineService.getLichHenKhamByIdBenhNhan(idBenhNhan);
    return data;
  }

  @Get('lichhenkham/idluotkham/:id')
  async getLichHenKhamByIdLuotKham(@Param('id') idLuotKham: number) {
    const data = await this.gd2DatLichOnlineService.getLichHenKhamByIdLuotkham(idLuotKham);
    return data;
  }
}
