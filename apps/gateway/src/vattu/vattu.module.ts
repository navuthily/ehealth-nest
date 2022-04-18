import { TranslationService } from '@libs/shared/services/translation.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VattuController } from './vattu.controller';
import { VattuRepository } from './vattu.repository';
import { VattuService } from './vattu.service';

@Module({
  imports: [TypeOrmModule.forFeature([VattuRepository], 'SV_FAMILY_')],
  controllers: [VattuController],
  exports: [VattuService, TranslationService],
  providers: [VattuService, TranslationService],
})
export class VattuModule {}
