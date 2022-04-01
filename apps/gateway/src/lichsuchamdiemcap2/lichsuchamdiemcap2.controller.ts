import {
  Body,
  Controller, Param, Patch, Post, Put, UseInterceptors
} from '@nestjs/common';
import {  ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateManyDto, Crud, CrudController, CrudRequest, CrudRequestInterceptor, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { LichSuChamDiemCap2Service } from './lichsuchamdiemcap2.service';
import { LichSuChamDiemCap2Entity } from './lichsuchamdiemcap2.entity';
import { Cap2DTO } from './dto/cap2DTO';
import { LichSuChamDiemCap1Service } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.service';
import { UpdateChamDiemDTO } from './dto/update-chamdiem-dto';


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
    const result = await this.addCap2(obj,req, idCap1)
    return result
  }





  //update suat an
  @UseInterceptors(CrudRequestInterceptor)
  @Post("editchamdiem")
  async update(@ParsedRequest() req: CrudRequest, @Body() obj: UpdateChamDiemDTO){
    const data = await this.lichsuchamdiemcap1Service.updateCap1(obj)  //update cap1 
    if(data){
      // console.log(obj);
        //xóa tất cả dữ liệu bảng lscdcap2
        await this.service.delete(obj.ID_AutoCap1)
        //thêm lại dữ liệu cho bảng cấp 2
        await this.addCap2(obj, req)
        return {
          message: "Update thành công!"
        }      
    }

    return {
      message: "Không tìm thấy idCap1!"
    }
  }

  async addCap2(obj,req,idCap1 = null){
    for(let i = 0; i < obj["lichsuchamdiemcap2s"].length; i++){
      obj["lichsuchamdiemcap2s"][i]["ID_AutoCap1"] = idCap1 ? idCap1 : obj.ID_AutoCap1
    }

    const dataCap2: any = {
      "bulk": obj["lichsuchamdiemcap2s"]
    };
    if(this.base.createManyBase){
      const data = await this.base.createManyBase(req, dataCap2);
      return data
    }
  }


}


