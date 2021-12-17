import { Module } from '@nestjs/common';
import { GoiKhamController } from './goikham.controller';
import { GoiKhamService } from './goikham.service';

@Module({
  controllers: [GoiKhamController],
  providers: [GoiKhamService],
})
export class GoiKhamModule {}
