import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmtrinhdoController } from './dmtrinhdo.controller';
import { DmtrinhdoRepository } from './dmtrinhdo.repository';
import { DmtrinhdoService } from './dmtrinhdo.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DmtrinhdoRepository]),   
  ],
  controllers: [DmtrinhdoController],
  exports: [DmtrinhdoService, TranslationService],
  providers: [DmtrinhdoService, TranslationService,],
})
export class DmtrinhdoModule {}
