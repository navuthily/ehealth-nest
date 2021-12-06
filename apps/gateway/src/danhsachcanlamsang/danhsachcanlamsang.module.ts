import { CacheModule, Module } from '@nestjs/common';
import { DanhSachCanLamSangController } from './danhsachcanlamsang.controller';
import { DanhSachCanLamSangService } from './danhsachcanlamsang.service';

@Module({
  controllers: [DanhSachCanLamSangController],
  providers: [DanhSachCanLamSangService],
})
export class DanhSachCanLamSangModule {}
