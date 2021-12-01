import {
  CacheInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ThuocService } from './thuoc.service';

@Controller('thuoc')
@UseInterceptors(CacheInterceptor)
export class ThuocController {
  constructor(private thuocService: ThuocService) {}

  @Get('dmthuoc')
  async getDmThuoc() {
    const data = await this.thuocService.exec_gd2_dmthuoc();
    return this.thuocService.trans_gd2_dmthuoc(data);
  }
}
