import {
  CacheInterceptor,
  CacheKey,
  CacheTTL, CACHE_MANAGER, Controller,
  Get, Inject, Injectable, UseInterceptors
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DanhSachLamSangService } from './danhsachlamsang.service';

@Controller('danhsachlamsang')
@Injectable()
export class DanhSachLamSangController {
  constructor(
    private danhSachLamSangService: DanhSachLamSangService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey('danhsachlamsang')
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
      danhsach: dataDanhSachLamSangDangChoNew,
      dangkham: dataDanhSachLamSangDangKhamNew.dangkham,
      daxong: dataDanhSachLamSangDangKhamNew.daxong,
    };
  }

  @Get('/xongdanhsachlamsang')
  async xongdanhsachlamsang() {
    const value = await this.getDanhSachLamSang();
    await this.cacheManager.set('danhsachlamsang', value, { ttl: 120 });
    return value;
  }
}
