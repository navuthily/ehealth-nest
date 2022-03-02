import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Put, Delete } from '@nestjs/common';
import { SuatAnService } from './suatan.service';
import { dataFilterDTO } from './dto/dataFilter.dto';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { ThemSuatAnDTO } from './dto/add-suat-an.dto';
import { getRepository } from 'typeorm';
import { UpdateSuatAnDTO } from './dto/update-suatan-dto.dto';
@ApiTags('suatan')
@Controller('suatan')
export class SuatAnController {
  constructor(
    private suatanService: SuatAnService,
  
  ) { }

    //lấy suất ăn theo id_luotkham và ngày tạo
  @Get('/:ngay/:id_luotkham')
  async suatan(@Param('ngay')  ngay,@Param('id_luotkham')  id_luotkham) {    
    let dayjs = require('dayjs')

    const dayFomat = dayjs(ngay).format('YYYY/MM/DD');
     return this.suatanService.getSuatAnByDay(dayFomat, id_luotkham);
  }


  //lấy suất ăn theo id_phieu
  @Get('/:id_phieu')
  async getByIdPhieu(@Param('id_phieu')  id_phieu) {  
     return this.suatanService.getSuatAnByIdPhieu(id_phieu);
  }


  
  @Post()
  // @ApiConsumes("multipart/form-data")
  async themsuatan(@Body() obj: ThemSuatAnDTO) { 

    // let dayjs = require('dayjs')
    // const dayFomat = dayjs(obj.ngay_ct).format('YYYY/MM/DD');
    return this.suatanService.themsuatan(obj)


    
  }

  //update suat an
  @Put("/:id_phieu")
  update(@Param('id_phieu') id_phieu: number, @Body() suatanUpdateData: UpdateSuatAnDTO){
    return this.suatanService.updateSuatan(id_phieu, suatanUpdateData)
  }


  //delete suatan

  @Delete('/:id_phieu')
  delete(@Param('id_phieu') id_phieu: number){

    console.log(id_phieu)
    return this.suatanService.deleteSuatan(id_phieu)
  }




  


//   @Get('suatan/:ngay')
//   async suatan(@Param('ngay')  ngay) {    
//      return this.suatanService.getDanhMucThucDon();
//   }
  

//   @Get('suatan/:id/suatanchitiet')
//   async suatanchitiet(@Param('id', ParseIntPipe)  id: number) {    
//      return this.suatanService.getDanhMucThucDon();
//   }
  
 

  // @Post('xuatxml')
  // async xuatxml(@Body() dataIds: ListIdThuTraNoJsonDTO) {
  //   let idThuTraNo = JSON.parse(dataIds.idThuTraNo);
  //   for (let i = 0; i < idThuTraNo.length; i++) {
  //     this.xmlBHYTQueue.add(
  //       'xml-bhyt',
  //       { ID_ThuTraNo: parseInt(idThuTraNo[i]) },
  //       { delay: 100 },
  //     );
  //   }
  //   return {};
  // }

  // @Post('kq_nhan_lichsu_kcb')
  // async kq_nhan_lichsu_kcb(@Body() dataKCB: dataKCBDTO) {
  //   const job = await this.xmlBHYTQueue.add('kq_nhan_lichsu_kcb', {
  //     dataKCB,
  //   });
  //   const result = await job.finished();
  //   return result;
  // }

  // @Get('getBenhChinh/:id')
  // async getICDBenhChinh(@Param('id') idThuTraNo: any) {
  //   return await this.xmlService.getBenhChinh(idThuTraNo);
  // }

  // @Get('getBenhKem/:id')
  // async getICDBenhKemICD10(@Param('id') idThuTraNo: any) {
  //   return await this.xmlService.getBenhKem(idThuTraNo);
  // }

  // @Get('xml1/:id')
  // getXML1(@Param('id') id: any): Promise<any> {
  //   return this.xmlService.exec_xml_1_tonghop(id);
  // }

  // @Get('xml2/:id')
  // getXML2(@Param('id') id: any): Promise<any> {
  //   return this.xmlService.exec_xml_2_thuoc(id);
  // }

  // @Get('xml3/:id')
  // getXML3(@Param('id') id: any): Promise<any> {
  //   return this.xmlService.exec_xml_3_canlamsang(id);
  // }

  // @Get('xml4/:id')
  // getXML4(@Param('id') id: any): Promise<any> {
  //   return this.xmlService.exec_xml_4_chitietcls(id);
  // }

  // @Get('xml5/:id')
  // getXML5(@Param('id') id: any): Promise<any> {
  //   return this.xmlService.exec_xml_5_dienbienbenh(id);
  // }

  // @Get('exec_stored_filter_date')
  // exec_stored_filter_date(@Query() dataFilter: dataFilterDTO) {
  //   return this.xmlService.exec_stored_filter_date(dataFilter);
  // }

 
}
