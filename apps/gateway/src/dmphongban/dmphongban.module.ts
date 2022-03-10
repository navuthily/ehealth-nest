import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmphongbanController } from './dmphongban.controller';
import { DmphongbanRepository } from './dmphongban.repository';
import { DmphongbanService } from './dmphongban.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DmphongbanRepository]),   
  ],
  controllers: [DmphongbanController],
  exports: [DmphongbanService, TranslationService],
  providers: [DmphongbanService, TranslationService,],
})
export class DmphongbanModule {}
