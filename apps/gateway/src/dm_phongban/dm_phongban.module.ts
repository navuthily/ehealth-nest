import { Module } from '@nestjs/common';
import { DMPhongBanController } from './dm_phongban.controller';
import { DMPhongBanService } from './dm_phongban.service';

@Module({
  imports: [],
  controllers: [DMPhongBanController],
  providers: [DMPhongBanService],
})
export class DMPhongBanModule {}
