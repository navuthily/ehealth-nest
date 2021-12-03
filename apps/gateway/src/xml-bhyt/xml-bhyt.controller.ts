import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Queue } from 'bull';
import { XmlBHYTService } from './xml-bhyt.service';

@Controller('xml-bhyt')
export class XmlBHYTController {
  constructor(
    private xmlService: XmlBHYTService,
    @InjectQueue('xml-bhyt') private readonly xmlBHYTQueue: Queue,
  ) {}

  @Post('xuatxml')
  async xuatxml(@Body() data: any) {
    let idThuTraNo = JSON.parse(data.idThuTraNo);
    for (let i = 0; i < idThuTraNo.length; i++) {
      this.xmlBHYTQueue.add('xml-bhyt', {
        ID_ThuTraNo: parseInt(idThuTraNo[i]),
      });
    }
    return {};
  }

  @Post('kq_nhan_lichsu_kcb')
  async kq_nhan_lichsu_kcb(@Body() dataKCB: any) {
    const job = await this.xmlBHYTQueue.add('kq_nhan_lichsu_kcb', {
      dataKCB,
    });
    const result = await job.finished();
    // console.log(result);
    
    return result;
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
  exec_stored_filter_date(@Query() dataDate: any) {
    return this.xmlService.exec_stored_filter_date(dataDate);
  }
}
