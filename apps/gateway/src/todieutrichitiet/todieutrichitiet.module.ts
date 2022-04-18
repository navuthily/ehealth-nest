import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TranslationService } from '@libs/shared/services/translation.service';
import { ToDieuTriChiTietService } from './todieutrichitiet.service';
import { ToDieuTriChiTietController } from './todieutrichitiet.controller';
import { ToDieuTriChiTietRepository } from './todieutrichitiet.repository';




@Module({
  imports: [
    TypeOrmModule.forFeature([ToDieuTriChiTietRepository]),   
  ],
  controllers: [ToDieuTriChiTietController],
  exports: [ToDieuTriChiTietService, TranslationService],
  providers: [ToDieuTriChiTietService, TranslationService,],
})
export class ToDieuTriChiTietModule {}
