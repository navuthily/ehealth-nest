import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TranslationService } from '@libs/shared/services/translation.service';
import { CauHinhDiemChamCap1Repository } from './cauhinhchamdiemcap1.repository';
import { CauHinhDiemChamCap1Service } from './cauhinhchamdiemcap1.service';
import { CauHinhChamDiemCap1Controller } from './cauhinhchamdiemcap1.controller';
import { CauHinhDiemChamCap1Entity } from './cauhinhdiemchamcap1.entity';




@Module({
  imports: [
    TypeOrmModule.forFeature([CauHinhDiemChamCap1Entity]),
    HttpModule   
  ],
  controllers: [ CauHinhChamDiemCap1Controller],
  exports: [ CauHinhDiemChamCap1Service, TranslationService],
  providers: [CauHinhDiemChamCap1Service, TranslationService,],
})
export class CauHinhDiemChamCap1Module {}
