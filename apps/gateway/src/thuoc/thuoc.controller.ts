import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  CacheInterceptor,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { ThuocService } from './thuoc.service';

@Controller('thuoc')
@UseInterceptors(CacheInterceptor)
export class ThuocController {
  constructor(
    private thuocService: ThuocService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue('thuoc') private readonly thuocQueue: Queue,
  ) {}

  async addQueue(nameQueue: string, req: any, dataBody: any) {
    const ip = this.thuocService.getIP(req);
    const job = await this.thuocQueue.add(nameQueue, {
      dataBody,
      ip,
    });
    const result = await job.finished();
    return result;
  }

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
        ttl: 60,
      });
    }
    return dataAllThuoc;
  }

  @Post('xuatthuoc')
  async xuathuoc(@Body() dataBody: any, @Request() req: any) {
    return this.addQueue('xuatthuoc', req, dataBody);
  }

  @Post('xuatdieuchuyen')
  async xuatdieuchuyen(@Body() dataBody: any, @Request() req: any) {
    return this.addQueue('xuatdieuchuyen', req, dataBody);
  }

  @Post('xuatnoitru')
  async xuatnoitru(@Body() dataBody: any, @Request() req: any) {
    return this.addQueue('xuatnoitru', req, dataBody);
  }

  @Post('xuatthuoctralainhacungcap')
  async xuatthuoctralainhacungcap(@Body() dataBody: any, @Request() req: any) {
    return this.addQueue('xuatthuoctralainhacungcap', req, dataBody);
  }

  @Post('xuathuythuoc')
  async xuathuythuoc(@Body() dataBody: any, @Request() req: any) {
    return this.addQueue('xuathuythuoc', req, dataBody);
  }
}
