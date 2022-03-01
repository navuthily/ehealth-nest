import { InjectQueue, Processor } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectConnection, InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { Connection, Repository } from 'typeorm';
import { ChiTietSuatAn } from './chitietsuatan.entity';



@Injectable()
export class ChiTietSuatAnService {
  constructor(
//     @InjectConnection() readonly connection: Connection,
//     @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectConnection("SV_FAMILY_") private chitietsuatanConnection: Connection,
// //     @InjectEntityManager("SV_FAMILY_") private entityManager: SuatAn
  ) { }


  async getSuatAnByDay() {
     const data = await this.chitietsuatanConnection.getRepository(ChiTietSuatAn).createQueryBuilder("Pos$ct66_EH").limit(10).getMany();


     // const stored = 
     //      `select top 100 * from  FAMILY_WRK.dbo.Pos$ph66_EH 
     //      where Ngaygiotao = '2017-02-06 19:44:04.880' 
     //       order by Id_Phieu desc 
         
     //      `;
     //      // where Ngaygiotao = '2021-11-17T04:46:17.210Z' 
     // const data = await this.connection.query(`${stored}`, []);
     // return data;             
  }

//   async getPhieuAnChiTiet() {
//      const stored = 
//           `select * from  FAMILY_WRK.dbo.Pos$ph66_EH
//                where Su_dung=1
//           `;
//      const data = await this.connection.query(`${stored}`, []);
//      return data;             
//   }


//   async getPhieuAnChiTietTheoNgay() {
//      const stored = 
//           `select * from  FAMILY_WRK.dbo.dmvt2
//                where Su_dung=1
//           `;
//      const data = await this.connection.query(`${stored}`, []);
//      return data;             
//   }
 

}
