import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TranslationService } from '@libs/shared/services/translation.service';
import { CauHinhToolCap1Service } from './cauhinhtoolcap1.service';
import { CauHinhToolCap1Controller } from './cauhinhtoolcap1.controller';
import { CauHinhToolCap1Repository } from './cauhinhtoolcap1.repository';



@Module({
  imports: [
    TypeOrmModule.forFeature([CauHinhToolCap1Repository]),   
  ],
  controllers: [CauHinhToolCap1Controller],
  exports: [CauHinhToolCap1Service, TranslationService],
  providers: [CauHinhToolCap1Service, TranslationService,],
})
export class CauHinhToolCap1Module {}
