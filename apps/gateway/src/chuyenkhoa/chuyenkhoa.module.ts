import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChuyenkhoaController } from './chuyenkhoa.controller';
import { ChuyenkhoaRepository } from './chuyenkhoa.repository';
import { ChuyenkhoaService } from './chuyenkhoa.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChuyenkhoaRepository]),   
  ],
  controllers: [ChuyenkhoaController],
  exports: [ChuyenkhoaService, TranslationService],
  providers: [ChuyenkhoaService, TranslationService,],
})
export class ChuyenkhoaModule {}
