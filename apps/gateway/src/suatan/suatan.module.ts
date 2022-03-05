import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SuatAnController } from './suatan.controller';
import { SuatAnService } from './suatan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuatAn } from './suatan.entity';
import { ChiTietSuatAn } from '../chitietsuatan/chitietsuatan.entity';
import { VatTu } from '../vattu/vattu.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([SuatAn, ChiTietSuatAn,VatTu], "SV_FAMILY_"),
    TypeOrmModule.forFeature([UserEntity]),
    
    HttpModule
  ],
  controllers: [SuatAnController],
  providers: [SuatAnService],
})
export class SuatAnModule {}
