import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { XmlBHYTService } from './xml-bhyt.service';

@Controller('xml-bhyt')
export class XmlBHYTController {
  constructor(
    private xmlService: XmlBHYTService,
    @InjectQueue('xml-bhyt') private readonly xmlBHYTQueue: Queue,
  ) {}

  // @Get('xuatxml')
  // async xuatxml(@Query() data: any) {
  //   let data_new: string[];
  //   if (typeof data['data[]'] === 'string') {
  //     data_new = [data['data[]']];
  //   } else {
  //     data_new = [...data['data[]']];
  //   }
  //   // console.log(data['data[]'].length);

  //   for (let i = 0; i < data_new.length; i++) {
  //     this.xmlBHYTQueue.add('xml-bhyt', {
  //       ID_ThuTraNo: data_new[i],
  //     });
  //   }
  //   return 'done("Done")';
  // }

  @Post('xuatxml')
  async xuatxml(@Body() data: any) {
    let idThuTraNo = JSON.parse(data.idThuTraNo);
    for (let i = 0; i < idThuTraNo.length; i++) {
      this.xmlBHYTQueue.add('xml-bhyt', {
        ID_ThuTraNo: idThuTraNo[i],
      });
    }
    return 'done("Done")';
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
}
