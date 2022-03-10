import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoaibangcapController } from './loaibangcap.controller';
import { LoaibangcapRepository } from './loaibangcap.repository';
import { LoaibangcapService } from './loaibangcap.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([LoaibangcapRepository]),   
  ],
  controllers: [LoaibangcapController],
  exports: [LoaibangcapService, TranslationService],
  providers: [LoaibangcapService, TranslationService,],
})
export class LoaibangcapModule {}
