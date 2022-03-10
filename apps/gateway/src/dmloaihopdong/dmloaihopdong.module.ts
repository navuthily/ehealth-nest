import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmloaihopdongController } from './dmloaihopdong.controller';
import { DmloaihopdongRepository } from './dmloaihopdong.repository';
import { DmloaihopdongService } from './dmloaihopdong.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DmloaihopdongRepository]),   
  ],
  controllers: [DmloaihopdongController],
  exports: [DmloaihopdongService, TranslationService],
  providers: [DmloaihopdongService, TranslationService,],
})
export class DmloaihopdongModule {}
