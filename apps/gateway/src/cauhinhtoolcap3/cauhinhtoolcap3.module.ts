import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TranslationService } from '@libs/shared/services/translation.service';
import { CauHinhToolCap3Service } from './cauhinhtoolcap3.service';
import { CauHinhToolCap3Controller } from './cauhinhtoolcap3.controller';
import { CauHinhToolCap3Repository } from './cauhinhtoolcap3.repository';



@Module({
  imports: [
    TypeOrmModule.forFeature([CauHinhToolCap3Repository]),   
  ],
  controllers: [CauHinhToolCap3Controller],
  exports: [CauHinhToolCap3Service, TranslationService],
  providers: [CauHinhToolCap3Service, TranslationService,],
})
export class CauHinhToolCap3Module {}
