import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BenhAnNoiTruController } from './benhannoitru.controller';
import { BenhAnNoiTruService } from './benhannoitru.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuatAn } from '../suatan/suatan.entity';
import { ChiTietSuatAn } from '../chitietsuatan/chitietsuatan.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([SuatAn, ChiTietSuatAn], "SV_FAMILY_"),
    HttpModule,
  ],
  controllers: [BenhAnNoiTruController],
  providers: [BenhAnNoiTruService],
})
export class BenhAnNoiTruModule {}
