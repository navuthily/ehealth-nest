import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChiTietSuatAnService } from './chitietsuatan.service';
@ApiTags('chitietsuatan')
@Controller('chitietsuatan')
export class ChiTietSuatAnController {
  constructor(
    private chitietsuatanService: ChiTietSuatAnService,
  
  ) { }

  @Get()
  async getAll(@Param('ngay')  ngay) {    
     return this.chitietsuatanService.getSuatAnByDay();
  }

  // @Get('suatan/:ngay')
  // async suatan(@Param('ngay')  ngay) {    
  //    return this.suatanService.getDanhMucThucDon();
  // }

  


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
