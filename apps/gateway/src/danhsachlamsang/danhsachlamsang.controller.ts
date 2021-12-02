import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { DanhSachLamSangService } from './danhsachlamsang.service';

@Controller('danhsachlamsang')
@UseInterceptors(CacheInterceptor)
export class DanhSachLamSangController {
  constructor(private danhSachLamSangService: DanhSachLamSangService) {}
  @CacheTTL(120)
  @Get()
  async getDanhSachLamSang() {
    const [dataDanhSachLamSangDangCho, dataDanhSachLamSangDangKham] =
      await Promise.all([
        this.danhSachLamSangService.getDanhSachLamSangDangCho(),
        this.danhSachLamSangService.getDanhSachLamSangDangKham(),
      ]);
    const dataDanhSachLamSangDangChoNew =
      this.danhSachLamSangService.trans_getDanhSachLamSangDangCho(
        dataDanhSachLamSangDangCho,
      );
    const dataDanhSachLamSangDangKhamNew =
      this.danhSachLamSangService.trans_getDanhSachLamSangDangKham(
        dataDanhSachLamSangDangKham,
      );
    return {
      danhsach: JSON.stringify(dataDanhSachLamSangDangChoNew),
      dangkham: JSON.stringify(dataDanhSachLamSangDangKhamNew.dangkham),
      daxong: JSON.stringify(dataDanhSachLamSangDangKhamNew.daxong),
    };
  }
}
