import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmbophanController } from './dmbophan.controller';
import { DmbophanRepository } from './dmbophan.repository';
import { DmbophanService } from './dmbophan.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DmbophanRepository]),   
  ],
  controllers: [DmbophanController],
  exports: [DmbophanService, TranslationService],
  providers: [DmbophanService, TranslationService,],
})
export class DmbophanModule {}
