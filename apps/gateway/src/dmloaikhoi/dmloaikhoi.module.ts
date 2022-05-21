import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmloaikhoiController } from './dmloaikhoi.controller';
import { DmloaikhoiRepository } from './dmloaikhoi.repository';
import { DmloaikhoiService } from './dmloaikhoi.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DmloaikhoiRepository]),   
  ],
  controllers: [DmloaikhoiController],
  exports: [DmloaikhoiService, TranslationService],
  providers: [DmloaikhoiService, TranslationService,],
})
export class DmloaikhoiModule {}
