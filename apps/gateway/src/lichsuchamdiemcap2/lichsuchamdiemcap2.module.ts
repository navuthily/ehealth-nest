import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationService } from '@libs/shared/services/translation.service';
import { LichSuChamDiemCap2Controller } from './lichsuchamdiemcap2.controller';
import { LichSuChamDiemCap2Service } from './lichsuchamdiemcap2.service';
import { LichSuChamDiemCap2Repository } from './lichsuchamdiemcap2.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([LichSuChamDiemCap2Repository]),   
  ],
  controllers: [LichSuChamDiemCap2Controller],
  exports: [LichSuChamDiemCap2Service, TranslationService],
  providers: [LichSuChamDiemCap2Service, TranslationService,],
})
export class LichSuChamDiemCap2Module {}
