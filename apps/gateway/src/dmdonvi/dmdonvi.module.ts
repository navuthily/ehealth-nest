import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmdonviController } from './dmdonvi.controller';
import { DmdonviRepository } from './dmdonvi.repository';
import { DmdonviService } from './dmdonvi.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DmdonviRepository]),   
  ],
  controllers: [DmdonviController],
  exports: [DmdonviService, TranslationService],
  providers: [DmdonviService, TranslationService,],
})
export class DmdonviModule {}
