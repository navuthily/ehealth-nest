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
    filter:[
      {
        field: "lichsuchamdiemcap2s.Value",
        operator: "$eq",
        value: "1"
      }
      
    ],
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
      'lichsuchamdiemcap2s.cauhinhtoolcap3':{
        alias: "l3c3",
        eager: false
      },
      'lichsuchamdiemcap2s.cauhinhtoolcap3.cauhinhtoolcap2':{
        eager: false
      }
      
      
    },


  }
})
@Controller('lichsuchamdiemcap1')
@ApiTags('lichsuchamdiemcap1')
export class DmdantocController implements CrudController<LichSuChamDiemCap1> {
  constructor(
    public service: LichSuChamDiemCap1Service,
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


//http://localhost:7000/lichsuchamdiemcap1?join=lichsuchamdiemcap2s&join=lichsuchamdiemcap2s.cauhinhtoolcap3&join=lichsuchamdiemcap2s.cauhinhtoolcap3.cauhinhtoolcap2&filter=lichsuchamdiemcap2s.ID_AutoCap1||$eq||${40}&filter=lichsuchamdiemcap2s.Value||$eq||1