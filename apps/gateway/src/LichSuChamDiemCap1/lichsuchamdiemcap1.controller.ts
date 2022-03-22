import {
  Controller, Get, Inject, CACHE_MANAGER
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { LichSuChamDiemCap1Service } from './lichsuchamdiemcap1.service';
import { LichSuChamDiemCap1 } from './lichsuchamdiemcap1.entity';
import { Cache } from 'cache-manager';

@Crud({
  model: {
    type: LichSuChamDiemCap1,
  },
  query: {
    join: {
      dinhnghialoaicongthuc: {
        eager: false
      },
      nhanvien: {
        eager: false
      },
      cauhinhtoolcap1: {
        eager: false
      },
      lichsuchamdiemcap2s: {
        eager: false,
        
      },
      
      
    },

    cache: 100000
  }
})
@Controller('lichsuchamdiemcap1')
@ApiTags('lichsuchamdiemcap1')
export class DmdantocController implements CrudController<LichSuChamDiemCap1> {
  constructor(
    public service: LichSuChamDiemCap1Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {






  }


  // @Get("hello")
  // async getAll(){
  //   var dataThucDon = await this.cacheManager.get('dataThucDon');
  //   if (!dataThucDon) {
  //     dataThucDon = await  this.service.getAll()
  //     await this.cacheManager.set('dataThucDon', dataThucDon, {
  //       ttl: 3,
  //     });

  //     return {
  //       loadFrom: "sever",
  //       data: dataThucDon,
        
  //     }
  //   }



  //   return {
  //     loadFrom: "cache",
  //     data: dataThucDon,
  //   }
  // }
}
