import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmloaitinhluongController } from './dmloaitinhluong.controller';
import { DmloaitinhluongRepository } from './dmloaitinhluong.repository';
import { DmloaitinhluongService } from './dmloaitinhluong.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DmloaitinhluongRepository]),   
  ],
  controllers: [DmloaitinhluongController],
  exports: [DmloaitinhluongService, TranslationService],
  providers: [DmloaitinhluongService, TranslationService,],
})
export class DmloaitinhluongModule {}
