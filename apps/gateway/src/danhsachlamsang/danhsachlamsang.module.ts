import { CacheModule, Module } from '@nestjs/common';
import { DanhSachLamSangController } from './danhsachlamsang.controller';
import { DanhSachLamSangService } from './danhsachlamsang.service';

@Module({
  imports: [
    // CacheModule.register({
    //   max: 0,
    //   ttl: 120,
    // }),
  ],
  controllers: [DanhSachLamSangController],
  providers: [DanhSachLamSangService],
})
export class DanhSachLamSangModule {}
