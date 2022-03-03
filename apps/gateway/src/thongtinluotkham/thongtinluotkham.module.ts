import { Module } from '@nestjs/common';
import { GD2DatLichOnlineService } from '../gd2_datlichonline/gd2_datlichonline.service';
import { ThongTinLuotKhamController } from './thongtinluotkham.controller';
import { ThongTinLuotKhamService } from './thongtinluotkham.service';

@Module({
  controllers: [ThongTinLuotKhamController],
  providers: [ThongTinLuotKhamService, GD2DatLichOnlineService],
})
export class ThongTinLuotKhamModule { }
