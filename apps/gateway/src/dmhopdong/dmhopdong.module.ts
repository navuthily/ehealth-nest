import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmhopdongController } from './dmhopdong.controller';
import { DmhopdongRepository } from './dmhopdong.repository';
import { DmhopdongService } from './dmhopdong.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DmhopdongRepository]),   
  ],
  controllers: [DmhopdongController],
  exports: [DmhopdongService, TranslationService],
  providers: [DmhopdongService, TranslationService,],
})
export class DmhopdongModule {}
