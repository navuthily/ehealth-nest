import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Injectable,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { DanhSachCanLamSangService } from './danhsachcanlamsang.service';

@ApiTags('danhsachcanlamsang')
@Controller('danhsachcanlamsang')
@Injectable()
export class DanhSachCanLamSangController {
  constructor(
    private danhSachCanLamSangService: DanhSachCanLamSangService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async dataDanhSachCanLamSang() {
    var dataCache = await this.cacheManager.get('dataDanhSachCanLamSang');
    if (!dataCache) {
      dataCache = await this.danhSachCanLamSangService.getDanhSachCanLamSang();
      await this.cacheManager.set('dataDanhSachCanLamSang', dataCache, {
        ttl: 10,
      });
    }
    return dataCache;
  }

  @Get()
  async getDanhSachCanLamSang(@Query() dataQuery: any) {
    const { dataFilter } = dataQuery;
    const dataDanhSachCanLamSang = await this.dataDanhSachCanLamSang();
    return this.danhSachCanLamSangService.trans_getDanhSachCanLamSang(
      dataDanhSachCanLamSang,
      dataFilter,
    );
  }

  @Post('/vantay')
  async vantayCanLamSang(@Body() dataVantay: any) {
    console.log(dataVantay)
    const dataDanhSachCanLamSang = await this.dataDanhSachCanLamSang();
    return this.danhSachCanLamSangService.vantayCanLamSang(
      dataDanhSachCanLamSang,
      dataVantay,
    );
  }
}
