import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiemthianhvanController } from './diemthianhvan.controller';
import { DiemthianhvanRepository } from './diemthianhvan.repository';
import { DiemthianhvanService } from './diemthianhvan.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([DiemthianhvanRepository]),   
  ],
  controllers: [DiemthianhvanController],
  exports: [DiemthianhvanService, TranslationService],
  providers: [DiemthianhvanService, TranslationService,],
})
export class DiemthianhvanModule {}
