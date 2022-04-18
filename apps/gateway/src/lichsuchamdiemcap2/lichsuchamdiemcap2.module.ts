import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationService } from '@libs/shared/services/translation.service';
import { LichSuChamDiemCap2Controller } from './lichsuchamdiemcap2.controller';
import { LichSuChamDiemCap2Service } from './lichsuchamdiemcap2.service';
import { LichSuChamDiemCap2Repository } from './lichsuchamdiemcap2.repository'
import { LichSuChamDiemCap1Service } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.service';
import { LichSuChamDiemCap1Module } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LichSuChamDiemCap2Repository]), 
    forwardRef(() => LichSuChamDiemCap1Module)  
  ],
  controllers: [LichSuChamDiemCap2Controller],
  exports: [LichSuChamDiemCap2Service, TranslationService],
  providers: [LichSuChamDiemCap2Service, TranslationService],
})
export class LichSuChamDiemCap2Module {}
