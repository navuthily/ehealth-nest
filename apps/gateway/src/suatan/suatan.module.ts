import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SuatAnController } from './suatan.controller';
import { SuatAnService } from './suatan.service';


@Module({
  imports: [
    HttpModule,
  ],
  controllers: [SuatAnController],
  providers: [SuatAnService],
})
export class SuatAnModule {}
