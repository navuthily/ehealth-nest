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
import { ThucDonService } from './thucdon.service';

@ApiTags('thucdon')
@Controller('thucdon')
@UseInterceptors(CacheInterceptor)
export class ThucDonController {
  constructor(
    private thucdonService: ThucDonService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async getAll() {
    var dataThucDon = await this.cacheManager.get('dataThucDon');
    if (!dataThucDon) {
      dataThucDon = await this.thucdonService.get_all();
      await this.cacheManager.set('dataThucDon', dataThucDon, {
        ttl: 600,
      });
    }
    return dataThucDon;
  }
}
