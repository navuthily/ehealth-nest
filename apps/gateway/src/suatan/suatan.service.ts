import { InjectQueue, Processor } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectConnection, InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { Connection, Repository } from 'typeorm';
import { dataFilterDTO } from './dto/dataFilter.dto';
import { SuatAn } from './suatan.entity';
import { ChiTietSuatAn } from '../chitietsuatan/chitietsuatan.entity';


@Injectable()
export class SuatAnService {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectConnection("SV_FAMILY_") private suatConnection: Connection,
//     @InjectEntityManager("SV_FAMILY_") private entityManager: SuatAn

     @InjectRepository(SuatAn, "SV_FAMILY_") private suatanRepo: Repository<SuatAn>
  ) { }

     //lấy suất ăn theo id_phieu
     async getSuatAnByIdPhieu(id_phieu: number) {
          const dataByIdPhieu = await (await this.getSuatAn())
          .where("Pos$ph66_EH.Id_Phieu = :Id_Phieu", { Id_Phieu: id_phieu})
          .getMany()

          return dataByIdPhieu


     }

     //lấy suất ăn theo id_luotkham và ngày tạo
     async getSuatAnByDay(ngay, id_luotkham: number) {
          const data = await (await this.getSuatAn())
          .where("Pos$ph66_EH.ngay_ct = :ngay_ct", {ngay_ct: ngay})
          .andWhere("Pos$ph66_EH.Id_LuotKham = :Id_LuotKham", {Id_LuotKham: id_luotkham})

          .getMany();

          return data;          


          // console.log(await this.suatConnection.getRepository(ChiTietSuatAn)
          // .createQueryBuilder("Pos$ct66_EH")
          // .leftJoinAndSelect("Pos$ct66_EH.vattu",  "dmvt2")

          // .limit(10)
          // . getMany())
          // console.log(await this.suatanRepo.find( {relations: ["chitietsuatans"]} ))
          // const data = await this.suatanRepo.find( {relations: ["chitietsuatans"]} )


          // const stored = 
          //      `select top 100 * from  FAMILY_WRK.dbo.Pos$ph66_EH 
          //      where Ngaygiotao = '2017-02-06 19:44:04.880' 
          //       order by Id_Phieu desc 
          
          //      `;
          //      // where Ngaygiotao = '2021-11-17T04:46:17.210Z' 
          // const data = await this.connection.query(`${stored}`, []);
          
     }

     async getSuatAn(){
          const data = await this.suatConnection.getRepository(SuatAn)
          .createQueryBuilder("Pos$ph66_EH")
          .leftJoinAndSelect("Pos$ph66_EH.chitietsuatans",  "Pos$ct66_EH")
          .leftJoinAndSelect("Pos$ct66_EH.vattu",  "dmvt2")
          return data; 
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
