import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateHdController } from './templatehd.controller';
import { TemplateHdRepository } from './templatehd.repository';
import { TemplateHdService } from './templatehd.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([TemplateHdRepository]),   
  ],
  controllers: [TemplateHdController],
  exports: [TemplateHdService, TranslationService],
  providers: [TemplateHdService, TranslationService,],
})
export class TemplateHdModule {}
