import { CacheModule, Module } from '@nestjs/common';
import { GD2DatLichOnlineController } from './gd2_datlichonline.controller';
import { GD2DatLichOnlineService } from './gd2_datlichonline.service';

@Module({
  controllers: [GD2DatLichOnlineController],
  providers: [GD2DatLichOnlineService],
})
export class GD2DatLichOnlineModule { }
