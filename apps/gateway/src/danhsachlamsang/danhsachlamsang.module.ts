import { CacheModule, Module } from '@nestjs/common';
import { DanhSachLamSangController } from './danhsachlamsang.controller';
import { DanhSachLamSangService } from './danhsachlamsang.service';

@Module({
  imports: [],
  controllers: [DanhSachLamSangController],
  providers: [DanhSachLamSangService],
})
export class DanhSachLamSangModule {}
