import { TranslationService } from '@libs/shared/services/translation.service';
import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmbenhnhanController } from './dmbenhnhan.controller';
import { DMbenhnhanEntity } from './dmbenhnhan.entity';
import { DMbenhnhanService } from './dmbenhnhan.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([DMbenhnhanEntity]),
    
    HttpModule
  ],
  controllers: [DmbenhnhanController],
  exports: [DMbenhnhanService, TranslationService],
  providers: [DMbenhnhanService, TranslationService,],
})
export class DMbenhnhanModule {}
