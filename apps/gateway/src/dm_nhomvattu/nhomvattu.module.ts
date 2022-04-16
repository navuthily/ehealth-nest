import { TranslationService } from '@libs/shared/services/translation.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NhomvattuController } from './nhomvattu.controller';
import { NhomvattuService } from './nhomvattu.service';
import { NhomvattuRepository } from './nhomvattu.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NhomvattuRepository], 'SV_FAMILY_')],
  controllers: [NhomvattuController],
  exports: [NhomvattuService, TranslationService],
  providers: [NhomvattuService, TranslationService],
})
export class NhomvattuModule {}
