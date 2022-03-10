import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThoihanhopdongController } from './thoihanhopdong.controller';
import { ThoihanhopdongRepository } from './thoihanhopdong.repository';
import { ThoihanhopdongService } from './thoihanhopdong.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ThoihanhopdongRepository]),   
  ],
  controllers: [ThoihanhopdongController],
  exports: [ThoihanhopdongService, TranslationService],
  providers: [ThoihanhopdongService, TranslationService,],
})
export class ThoihanhopdongModule {}
