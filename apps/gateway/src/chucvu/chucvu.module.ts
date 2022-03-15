import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChucvuController } from './chucvu.controller';
import { ChucvuRepository } from './chucvu.repository';
import { ChucvuService } from './chucvu.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChucvuRepository]),   
  ],
  controllers: [ChucvuController],
  exports: [ChucvuService, TranslationService],
  providers: [ChucvuService, TranslationService,],
})
export class ChucvuModule {}
