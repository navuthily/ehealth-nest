import {
  Body,
  CacheInterceptor,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { DMPhongBanService } from './dm_phongban.service';

@ApiTags('dm_phongban')
@Controller('dm_phongban')
@UseInterceptors(CacheInterceptor)
export class DMPhongBanController {
  constructor(
    private dmPhongBanService: DMPhongBanService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async getAll() {
    var dataDMPhongBan = await this.cacheManager.get('dataDMPhongBan');
    if (!dataDMPhongBan) {
      dataDMPhongBan = await this.dmPhongBanService.get_all();
      await this.cacheManager.set('dataDMPhongBan', dataDMPhongBan, {
        ttl: 600,
      });
    }
    return dataDMPhongBan;
  }
}
