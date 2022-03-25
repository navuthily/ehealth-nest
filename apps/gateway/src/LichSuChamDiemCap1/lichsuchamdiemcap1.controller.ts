import {
  Controller, Get, Inject, CACHE_MANAGER, Post, Body, UseInterceptors
} from '@nestjs/common';
import {  ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateManyDto, Crud, CrudController, CrudRequest, CrudRequestInterceptor, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
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





  // @UseInterceptors(CrudRequestInterceptor)
  // @ApiConsumes('multipart/form-data')
  // @Post('/luu')
  // async abc(
  //   @ParsedRequest() req: CrudRequest, 
  //   @ParsedBody() dto: CreateManyDto<LichSuChamDiemCap1>
  // ){
  //   if(this.base.createManyBase){
  //     const data = await this.base.createManyBase(req, dto);
  //     console.log(data)
  //     return data
  //   }
    
    
  // }
}
