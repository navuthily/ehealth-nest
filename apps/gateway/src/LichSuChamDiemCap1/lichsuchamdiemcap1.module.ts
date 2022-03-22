import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmdantocController } from './lichsuchamdiemcap1.controller';
import { LichSuChamDiemCap1Service } from './lichsuchamdiemcap1.service';
import { TranslationService } from '@libs/shared/services/translation.service';
import { LichSuChamDiemCap1Repository } from './lichsuchamdiemcap1.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([LichSuChamDiemCap1Repository]),   
  ],
  controllers: [DmdantocController],
  exports: [LichSuChamDiemCap1Service, TranslationService],
  providers: [LichSuChamDiemCap1Service, TranslationService,],
})
export class LichSuChamDiemCap1Module {}
