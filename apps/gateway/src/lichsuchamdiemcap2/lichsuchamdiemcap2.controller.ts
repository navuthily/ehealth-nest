import {
  Body,
  Controller, Post, UseInterceptors
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { CreateManyDto, Crud, CrudController, CrudRequest, CrudRequestInterceptor, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { LichSuChamDiemCap2Service } from './lichsuchamdiemcap2.service';
import { LichSuChamDiemCap2Entity } from './lichsuchamdiemcap2.entity';
import { Cap2DTO } from './dto/cap2DTO';
import { LichSuChamDiemCap1Service } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.service';


@Crud({
  model: {
    type: LichSuChamDiemCap2Entity,
  },
  query: {

    join: {
      cauhinhtoolcap3: {
        eager: false
      },

      lichsuchamdiemcap1:{
        eager: false
      },
      "cauhinhtoolcap3.cauhinhtoolcap2":{
    
        eager: false
      },

    }
  }
})
@Controller('lichsuchamdiemcap2')
@ApiTags('lichsuchamdiemcap2')
export class LichSuChamDiemCap2Controller implements CrudController<LichSuChamDiemCap2Entity> {
  constructor(
    public service: LichSuChamDiemCap2Service,
    public lichsuchamdiemcap1Service: LichSuChamDiemCap1Service
  ) {
  }

  get base(): CrudController<LichSuChamDiemCap2Entity>{
    return this
  }


  @UseInterceptors(CrudRequestInterceptor)
  @Post('/luu')
  async createabc(@ParsedRequest() req: CrudRequest, @Body() obj: Cap2DTO)
  {
    const data = await this.lichsuchamdiemcap1Service.createLSCDC1(obj)  //thêm bảng lich sủ cham diem cap1 
    const idCap1 = data["id"]; //nhận id cấp 1


    console.log(data);
    
    for(let i = 0; i < obj["lichsuchamdiemcap2s"].length; i++){
      obj["lichsuchamdiemcap2s"][i]["ID_AutoCap1"] = idCap1
    }
    
    const dataCap2 = {
      "bulk": obj["lichsuchamdiemcap2s"]
    };
  
    if(this.base.createManyBase){
      const data = await this.base.createManyBase(req, dataCap2);
      return data
    }


    

  }

}
