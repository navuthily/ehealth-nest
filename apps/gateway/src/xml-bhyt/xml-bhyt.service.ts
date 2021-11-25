import { InjectQueue, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { InjectConnection } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { EntityManager } from 'typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  Repository,
} from 'typeorm';

@Processor('xml-bhyt')
@Injectable()
export class XmlBHYTService {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @InjectQueue('xml-bhyt') private readonly xmlBHYTQueue: Queue,
  ) {}
  // @Cron('*/10 * * * * *')
  async handleCron() {
    const data = await this.connection.query('EXEC GD2_BHYT_xml_chuachuyen');
    for (let i = 0; i < data.length; i++) {
      //   console.log(data[i]?.ID_ThuTraNo);
      this.xmlBHYTQueue.add('xml-bhyt', {
        ID_ThuTraNo: data[i]?.ID_ThuTraNo,
      });
    }
    // console.log();
  }
}
