import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TranslationService } from '@libs/shared/services/translation.service';
import { CauHinhToolCap2Service } from './cauhinhtoolcap2.service';
import { CauHinhToolCap2Controller } from './cauhinhtoolcap2.controller';
import { CauHinhToolCap2Repository } from './cauhinhtoolcap2.repository';



@Module({
  imports: [
    TypeOrmModule.forFeature([CauHinhToolCap2Repository]),   
  ],
  controllers: [CauHinhToolCap2Controller],
  exports: [CauHinhToolCap2Service, TranslationService],
  providers: [CauHinhToolCap2Service, TranslationService,],
})
export class CauHinhToolCap2Module {}
