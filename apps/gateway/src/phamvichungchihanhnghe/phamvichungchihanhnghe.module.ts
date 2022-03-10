import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhamvichungchihanhngheController } from './phamvichungchihanhnghe.controller';
import { PhamvichungchihanhngheRepository } from './phamvichungchihanhnghe.repository';
import { PhamvichungchihanhngheService } from './phamvichungchihanhnghe.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([PhamvichungchihanhngheRepository]),   
  ],
  controllers: [PhamvichungchihanhngheController],
  exports: [PhamvichungchihanhngheService, TranslationService],
  providers: [PhamvichungchihanhngheService, TranslationService,],
})
export class PhamvichungchihanhngheModule {}
