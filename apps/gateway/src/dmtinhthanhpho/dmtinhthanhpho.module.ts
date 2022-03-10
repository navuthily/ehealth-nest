import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmtinhthanhphoController } from './dmtinhthanhpho.controller';
import { DmtinhthanhphoRepository } from './dmtinhthanhpho.repository';
import { DmtinhthanhphoService } from './dmtinhthanhpho.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DmtinhthanhphoRepository]),   
  ],
  controllers: [DmtinhthanhphoController],
  exports: [DmtinhthanhphoService, TranslationService],
  providers: [DmtinhthanhphoService, TranslationService,],
})
export class DmtinhthanhphoModule {}
