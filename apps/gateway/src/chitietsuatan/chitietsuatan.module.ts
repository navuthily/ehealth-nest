import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ChiTietSuatAn } from './chitietsuatan.entity';
import { ChiTietSuatAnController } from './chitietsuatan.controller';
import { ChiTietSuatAnService } from './chitietsuatan.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([ChiTietSuatAn], "SV_FAMILY_"),
    HttpModule,
  ],
  controllers: [ChiTietSuatAnController],
  providers: [ChiTietSuatAnService],
})
export class ChiTietSuatAnModule {}
