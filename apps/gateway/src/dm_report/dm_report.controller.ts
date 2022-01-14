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
import { DMReportService } from './dm_report.service';

@ApiTags('dm_report')
@Controller('dm_report')
@UseInterceptors(CacheInterceptor)
export class DMReportController {
  constructor(
    private dmReportService: DMReportService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async getAll() {
    var dataDMReport = await this.cacheManager.get('dataDMReport');
    if (!dataDMReport) {
      dataDMReport = await this.dmReportService.get_all();
      await this.cacheManager.set('dataDMReport', dataDMReport, {
        ttl: 60,
      });
    }
    return dataDMReport;
  }

  @Post('get_url_report')
  async get_url_report(@Body() data: any) {
    const dataURL = await this.dmReportService.get_url_report(data);
    return dataURL;
  }
}
