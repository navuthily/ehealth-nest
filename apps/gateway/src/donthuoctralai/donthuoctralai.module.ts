import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationService } from '@libs/shared/services/translation.service';
import { DonthuoctralaiController } from './donthuoctralai.controller';
import { DonthuoctralaiRepository } from './donthuoctralai.repository';
import { DonthuoctralaiService } from './donthuoctralai.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([DonthuoctralaiRepository]),   
  ],
  controllers: [DonthuoctralaiController],
  exports: [DonthuoctralaiService, TranslationService],
  providers: [DonthuoctralaiService, TranslationService,],
})
export class DonthuoctralaiModule {}
