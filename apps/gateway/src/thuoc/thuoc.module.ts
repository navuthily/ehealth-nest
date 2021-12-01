import { CacheModule, Module } from '@nestjs/common';
import { ThuocController } from './thuoc.controller';
import { ThuocService } from './thuoc.service';

@Module({
  imports: [
    CacheModule.register({
      max: 0,
      ttl: 60,
    }),
  ],
  controllers: [ThuocController],
  providers: [ThuocService],
})
export class ThuocModule {}
