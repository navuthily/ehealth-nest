import { BullModule } from '@nestjs/bull';
import { CacheModule, Module } from '@nestjs/common';
import { ThuocController } from './thuoc.controller';
import { ThuocProcessor } from './thuoc.processor';
import { ThuocService } from './thuoc.service';

@Module({
  imports: [
    CacheModule.register({
      max: 0,
      ttl: 60,
      isGlobal: true,
    }),
    BullModule.registerQueue({
      name: 'thuoc',
    }),
  ],
  controllers: [ThuocController],
  providers: [ThuocService, ThuocProcessor],
})
export class ThuocModule {}
