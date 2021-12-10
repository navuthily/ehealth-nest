import {
  CacheInterceptor,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DMLoaiKhamService } from './dmloaikham.service';

@Controller('dmloaikham')
@UseInterceptors(CacheInterceptor)
export class DMLoaiKhamController {
  constructor(
    private dmLoaiKhamService: DMLoaiKhamService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('getAll')
  async getDMLoaiKham() {
    var dataDMLoaiKham = await this.cacheManager.get('dataDMLoaiKham');
    if (!dataDMLoaiKham) {
      dataDMLoaiKham = await this.dmLoaiKhamService.exec_gd2_dmloaikham();
      await this.cacheManager.set('dataDMLoaiKham', dataDMLoaiKham, {
        ttl: 60,
      });
    }
    return dataDMLoaiKham;
  }
}
