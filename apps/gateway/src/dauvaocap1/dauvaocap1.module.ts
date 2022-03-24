import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TranslationService } from '@libs/shared/services/translation.service';
import { DauVaoCap1Repository } from './dauvaocap1.repository';
import { DauVaoCap1Controller } from './dauvaocap1.controller';
import { DauVaoCap1Service } from './dauvaocap1.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([DauVaoCap1Repository]),   
  ],
  controllers: [DauVaoCap1Controller],
  exports: [DauVaoCap1Service, TranslationService],
  providers: [DauVaoCap1Service, TranslationService,],
})
export class DauVaoCap1Module {}
