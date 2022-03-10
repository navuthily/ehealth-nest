import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmquoctichController } from './dmquoctich.controller';
import { DmquoctichRepository } from './dmquoctich.repository';
import { DmquoctichService } from './dmquoctich.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DmquoctichRepository]),   
  ],
  controllers: [DmquoctichController],
  exports: [DmquoctichService, TranslationService],
  providers: [DmquoctichService, TranslationService,],
})
export class DmquoctichModule {}
