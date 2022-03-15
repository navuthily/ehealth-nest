import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmdantocController } from './dmdantoc.controller';
import { DmdantocRepository } from './dmdantoc.repository';
import { DmdantocService } from './dmdantoc.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DmdantocRepository]),   
  ],
  controllers: [DmdantocController],
  exports: [DmdantocService, TranslationService],
  providers: [DmdantocService, TranslationService,],
})
export class DmdantocModule {}
