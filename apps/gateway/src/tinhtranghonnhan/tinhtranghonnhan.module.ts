import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TinhtranghonnhanController } from './tinhtranghonnhan.controller';
import { TinhtranghonnhanRepository } from './tinhtranghonnhan.repository';
import { TinhtranghonnhanService } from './tinhtranghonnhan.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([TinhtranghonnhanRepository]),   
  ],
  controllers: [TinhtranghonnhanController],
  exports: [TinhtranghonnhanService, TranslationService],
  providers: [TinhtranghonnhanService, TranslationService,],
})
export class TinhtranghonnhanModule {}
