import { CacheModule, Module } from '@nestjs/common';
import { DMLoaiKhamController } from './dmloaikham.controller';
import { DMLoaiKhamService } from './dmloaikham.service';

@Module({
  imports: [],
  controllers: [DMLoaiKhamController],
  providers: [DMLoaiKhamService],
})
export class DMLoaiKhamModule {}
