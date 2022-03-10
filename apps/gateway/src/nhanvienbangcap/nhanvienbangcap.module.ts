import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NhanvienbangcapController } from './nhanvienbangcap.controller';
import { NhanvienbangcapRepository } from './nhanvienbangcap.repository';
import { NhanvienbangcapService } from './nhanvienbangcap.service';
import { TranslationService } from '@libs/shared/services/translation.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([NhanvienbangcapRepository]),   
  ],
  controllers: [NhanvienbangcapController],
  exports: [NhanvienbangcapService, TranslationService],
  providers: [NhanvienbangcapService, TranslationService,],
})
export class NhanvienbangcapModule {}
