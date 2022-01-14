import { Controller, Get, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoiKhamService } from './goikham.service';

@ApiTags('goikham')
@Controller('goikham')
@Injectable()
export class GoiKhamController {
  constructor(private goiKhamService: GoiKhamService) {}

  @Get('getAll')
  async getGoiKhamAll() {
    return await this.goiKhamService.exec_GD2_GoiKham_SelectAll();
  }
}
