import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonthuocRepository } from './Donthuoc.repository';
import { TranslationService } from '@libs/shared/services/translation.service';
import { DonThuocController } from './donthuoc.controller';
import { DonThuocService } from './donthuoc.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DonthuocRepository]),   
  ],
  controllers: [DonThuocController],
  exports: [DonThuocService, TranslationService],
  providers: [DonThuocService, TranslationService,],
})
export class DonthuocModule {}
