import { Controller, Get, Injectable } from '@nestjs/common';
import { GoiKhamService } from './goikham.service';

@Controller('goikham')
@Injectable()
export class GoiKhamController {
  constructor(private goiKhamService: GoiKhamService) {}

  @Get('getAll')
  async getGoiKhamAll() {
    return await this.goiKhamService.exec_GD2_GoiKham_SelectAll();
  }
}
