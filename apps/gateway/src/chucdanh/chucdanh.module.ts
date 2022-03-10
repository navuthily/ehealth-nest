import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChucdanhController } from './chucdanh.controller';
import { ChucdanhRepository } from './chucdanh.repository';
import { ChucdanhService } from './chucdanh.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChucdanhRepository]),   
  ],
  controllers: [ChucdanhController],
  exports: [ChucdanhService, TranslationService],
  providers: [ChucdanhService, TranslationService,],
})
export class ChucdanhModule {}
