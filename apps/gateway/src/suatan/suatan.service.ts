import { InjectQueue, Processor } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectConnection } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { Connection } from 'typeorm';
import { dataFilterDTO } from './dto/dataFilter.dto';


@Injectable()
export class SuatAnService {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }


  async getSuatAnByDay() {
     const stored = 
          `select * from  FAMILY_WRK.dbo.dmvt2
               where Su_dung=1
          `;
     const data = await this.connection.query(`${stored}`, []);
     return data;             
  }

  async getPhieuAnChiTiet() {
     const stored = 
          `select * from  FAMILY_WRK.dbo.dmvt2
               where Su_dung=1
          `;
     const data = await this.connection.query(`${stored}`, []);
     return data;             
  }


  async getPhieuAnChiTietTheoNgay() {
     const stored = 
          `select * from  FAMILY_WRK.dbo.dmvt2
               where Su_dung=1
          `;
     const data = await this.connection.query(`${stored}`, []);
     return data;             
  }
 

}
