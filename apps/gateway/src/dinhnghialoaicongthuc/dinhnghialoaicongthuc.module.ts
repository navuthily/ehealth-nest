import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DinhNghiaLoaiCongThucController } from './dinhnghialoaicongthuc.controller';
import { TranslationService } from '@libs/shared/services/translation.service';
import { DinhNghiaLoaiCongThucService } from './dinhnghialoaicongthuc.service';
import { DinhNghiaLoaiCongThucRepository } from './dinhnghialoaicongthuc.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([DinhNghiaLoaiCongThucRepository]),   
  ],
  controllers: [DinhNghiaLoaiCongThucController],
  exports: [DinhNghiaLoaiCongThucService, TranslationService],
  providers: [DinhNghiaLoaiCongThucService, TranslationService,],
})
export class DinhNghiaLoaiCongThucModule {}
