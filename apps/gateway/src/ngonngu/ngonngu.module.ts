import { TranslationService } from '@libs/shared/services/translation.service';
import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmlanguageController } from './ngonngu.controller';
import { DMlanguageService } from './ngonngu.service';
import { DMlanguageEntity } from './ngonngu.entity';
import { DMlabelEntity } from '../dmlabel/dmlabel.entity';
import { DMlabellanguageEntity } from '../dmlabellanguage/dmlabellanguage.entity';





@Module({
  imports: [
    TypeOrmModule.forFeature([DMlanguageEntity, DMlabellanguageEntity, DMlabelEntity], "SV_THANHVIEN_"),
    
    HttpModule
  ],
  controllers: [DmlanguageController],
  exports: [DMlanguageService, TranslationService],
  providers: [DMlanguageService, TranslationService,],
})
export class DMngonnguModule {}
