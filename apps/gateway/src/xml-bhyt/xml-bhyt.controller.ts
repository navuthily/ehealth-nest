import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { Queue } from 'bull';
import { XmlBHYTService } from './xml-bhyt.service';
// import { NhanLayXeDTO } from './dto/nhanlayxe.dto';
// import { NhaXeDTO } from './dto/nhaxe.dto';

@Controller('xml-bhyt')
export class XmlBHYTController {
  constructor(
    private handleCron: XmlBHYTService,
    @InjectQueue('xml-bhyt') private readonly xmlBHYTQueue: Queue,
  ) {}

  @Get('xuatxml')
  async xuatxml(@Query() data: any) {
    let data_new: string[];
    if (typeof data['data[]'] === 'string') {
      data_new = [data['data[]']];
    } else {
      data_new = [...data['data[]']];
    }
    // console.log(data['data[]'].length);

    for (let i = 0; i < data_new.length; i++) {
      this.xmlBHYTQueue.add('xml-bhyt', {
        ID_ThuTraNo: data_new[i],
      });
    }
    return 'done("Done")';
  }
}
