import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationService } from '@libs/shared/services/translation.service';
import { ThoiGianChoPhepDatLichRepository } from './cauhinhthoigianchophepdatlich.repository';
import { ThoiGianDatLichController } from './cauhinhthoigianchophepdatlich.controller';
import { ThoiGianDatLichService } from './cauhinhthoigianchophepdatlich.service';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ThoiGianChoPhepDatLichRepository], 'SV_THANHVIEN_'), UserModule
  ],
  controllers: [ThoiGianDatLichController],
  exports: [ThoiGianDatLichService, TranslationService],
  providers: [ThoiGianDatLichService, TranslationService],
})
export class ThoiGianDatLichdoModule {}
