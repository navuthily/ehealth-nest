import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Queue } from 'bull';
import { log } from 'util';
import { XmlBHYTService } from './xml-bhyt.service';
import { ListIdThuTraNoJsonDTO } from "./dto/listIdThuTraNo.dto";
import { dataKCBDTO } from './dto/dataKCB.dto';
import { dataFilterDTO } from './dto/dataFilter.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('xml-bhyt')
@Controller('xml-bhyt')
export class XmlBHYTController {
  constructor(
    private xmlService: XmlBHYTService,
    @InjectQueue('xml-bhyt') private readonly xmlBHYTQueue: Queue,
  ) { }

  @Post('xuatxml')
  async xuatxml(@Body() dataIds: ListIdThuTraNoJsonDTO) {
    let idThuTraNo = JSON.parse(dataIds.idThuTraNo);
    for (let i = 0; i < idThuTraNo.length; i++) {
      this.xmlBHYTQueue.add(
        'xml-bhyt',
        { ID_ThuTraNo: parseInt(idThuTraNo[i]) },
        { delay: 100 },
      );
    }
    return {};
  }

  @Post('kq_nhan_lichsu_kcb')
  async kq_nhan_lichsu_kcb(@Body() dataKCB: dataKCBDTO) {
    const job = await this.xmlBHYTQueue.add('kq_nhan_lichsu_kcb', {
      dataKCB,
    });
    const result = await job.finished();
    return result;
  }

  @Get('getBenhChinh/:id')
  async getICDBenhChinh(@Param('id') idThuTraNo: any) {
    return await this.xmlService.getBenhChinhByIDThuTraNo(idThuTraNo);
  }

  @Get('getBenhKem/:id')
  async getICDBenhKemICD10(@Param('id') idThuTraNo: any) {
    return await this.xmlService.getBenhKemByIDThuTraNo(idThuTraNo);
  }

  @Get('xml1/:id')
  getXML1(@Param('id') id: any): Promise<any> {
    return this.xmlService.exec_xml_1_tonghop(id);
  }

  @Get('xml2/:id')
  getXML2(@Param('id') id: any): Promise<any> {
    return this.xmlService.exec_xml_2_thuoc(id);
  }

  @Get('xml3/:id')
  getXML3(@Param('id') id: any): Promise<any> {
    return this.xmlService.exec_xml_3_canlamsang(id);
  }

  @Get('xml4/:id')
  getXML4(@Param('id') id: any): Promise<any> {
    return this.xmlService.exec_xml_4_chitietcls(id);
  }

  @Get('xml5/:id')
  getXML5(@Param('id') id: any): Promise<any> {
    return this.xmlService.exec_xml_5_dienbienbenh(id);
  }

  @Get('exec_stored_filter_date')
  exec_stored_filter_date(@Query() dataFilter: dataFilterDTO) {
    return this.xmlService.exec_stored_filter_date(dataFilter);
  }

  // @Get('test')
  // async test() {
  //   return await this.xmlService.getBenhKemByIDThuTraNo(3798067);
  // }
}
