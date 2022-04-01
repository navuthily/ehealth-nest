import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationService } from '@libs/shared/services/translation.service';
import { DonthuocchitietController } from './donthuocchitiet.controller';
import { DonthuocchitietService } from './donthuocchitiet.service';
import { DonthuocchitietRepository } from './donthuocchitiet.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([DonthuocchitietRepository]),   
  ],
  controllers: [DonthuocchitietController],
  exports: [DonthuocchitietService, TranslationService],
  providers: [DonthuocchitietService, TranslationService,],
})
export class DonthuocchitietModule {}
