import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TranslationService } from '@libs/shared/services/translation.service';
import { ToDieuTriRepository } from './todieutri.repository';
import { ToDieuTriController } from './todieutri.controller';
import { ToDieuTriService } from './todieutri.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([ToDieuTriRepository]),   
  ],
  controllers: [ToDieuTriController],
  exports: [ToDieuTriService, TranslationService],
  providers: [ToDieuTriService, TranslationService,],
})
export class ToDieuTriModule {}
