import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NhanvienhopdongController } from './nhanvienhopdong.controller';
import { NhanvienhopdongRepository } from './nhanvienhopdong.repository';
import { NhanvienhopdongService } from './nhanvienhopdong.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([NhanvienhopdongRepository]),   
  ],
  controllers: [NhanvienhopdongController],
  exports: [NhanvienhopdongService, TranslationService],
  providers: [NhanvienhopdongService, TranslationService,],
})
export class NhanvienhopdongModule {}
