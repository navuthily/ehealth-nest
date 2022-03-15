import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmnganhangController } from './dmnganhang.controller';
import { DmnganhangRepository } from './dmnganhang.repository';
import { DmnganhangService } from './dmnganhang.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DmnganhangRepository]),   
  ],
  controllers: [DmnganhangController],
  exports: [DmnganhangService, TranslationService],
  providers: [DmnganhangService, TranslationService,],
})
export class DmnganhangModule {}
