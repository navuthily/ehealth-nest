import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BenhAnNoiTruController } from './benhannoitru.controller';
import { BenhAnNoiTruService } from './benhannoitru.service';


@Module({
  imports: [
    HttpModule,
  ],
  controllers: [BenhAnNoiTruController],
  providers: [BenhAnNoiTruService],
})
export class BenhAnNoiTruModule {}
