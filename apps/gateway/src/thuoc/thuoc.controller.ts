import {
  CacheInterceptor,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ThuocService } from './thuoc.service';

@Controller('thuoc')
@UseInterceptors(CacheInterceptor)
export class ThuocController {
  constructor(
    private thuocService: ThuocService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('dmthuoc')
  async getDmThuoc() {
    var dataDMThuoc = await this.cacheManager.get('dataDMThuoc');
    if (!dataDMThuoc) {
      dataDMThuoc = await this.thuocService.exec_gd2_dmthuoc();
      await this.cacheManager.set('dataDMThuoc', dataDMThuoc, {
        ttl: 60,
      });
    }
    return this.thuocService.trans_gd2_dmthuoc(dataDMThuoc);
  }

  @Get('getAllThuoc')
  async getAllThuoc() {
    var dataAllThuoc = await this.cacheManager.get('dataAllThuoc');
    if (!dataAllThuoc) {
      dataAllThuoc = await this.thuocService.exec_gd2_thuoc_selectall_tam();
      await this.cacheManager.set('dataAllThuoc', dataAllThuoc, {
        ttl: 120,
      });
    }
    return dataAllThuoc;
  }
}
