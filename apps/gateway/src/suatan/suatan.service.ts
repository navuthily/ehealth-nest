import { InjectQueue, Processor } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectConnection, InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { Connection, Repository, getRepository } from 'typeorm';
import { dataFilterDTO } from './dto/dataFilter.dto';
import { SuatAn } from './suatan.entity';
import { ChiTietSuatAn } from '../chitietsuatan/chitietsuatan.entity';
import { ThemSuatAnDTO } from './dto/add-suat-an.dto';


@Injectable()
export class SuatAnService {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectConnection("SV_FAMILY_") private SV_FAMILYconnection: Connection,
//     @InjectEntityManager("SV_FAMILY_") private entityManager: SuatAn

     @InjectRepository(SuatAn, "SV_FAMILY_") private suatanRepo: Repository<SuatAn>,
     @InjectRepository(ChiTietSuatAn, "SV_FAMILY_") private chitietsuatanRepo: Repository<ChiTietSuatAn>,
     
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


          // console.log(await this.SV_FAMILYconnection.getRepository(ChiTietSuatAn)
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
          const data = await this.SV_FAMILYconnection.getRepository(SuatAn)
          .createQueryBuilder("Pos$ph66_EH")
          .leftJoinAndSelect("Pos$ph66_EH.chitietsuatans",  "Pos$ct66_EH")
          .leftJoinAndSelect("Pos$ct66_EH.vattu",  "dmvt2")
          return data; 
     }


     async themsuatan(obj: ThemSuatAnDTO){
          let dayjs = require('dayjs')
          const dayFomat = dayjs(obj.ngay_ct).format('YYYY/MM/DD');

          const suatan = await this.SV_FAMILYconnection.getRepository(SuatAn)
          .createQueryBuilder('Pos$ph66_EH')
          .where('Pos$ph66_EH.Id_Buoi = :Id_Buoi', { Id_Buoi: obj.Id_Buoi })
          .andWhere('Pos$ph66_EH.ngay_ct = :ngay_ct', { ngay_ct: dayFomat })
          .andWhere('Pos$ph66_EH.Id_LuotKham = :Id_LuotKham', { Id_LuotKham: obj.Id_LuotKham })
          .getOne()
          // console.log(dayFomat)
          //NEU SUAT AN  DA TON TAI
          if(suatan){
               throw "Suất ăn đã  tồn tại!"
          }else{
                //NEU SUAT AN CHƯA DA TON TAI
               // THEM VAO BANG SUATAN
               const newSuatan = await this.suatanRepo.create(obj)
               const dataResult = await this.suatanRepo.save(newSuatan).catch(err => {
                    throw new HttpException({
                         message: err.message
                    }, HttpStatus.BAD_REQUEST);
               })
               console.log(dataResult.Id_Phieu)

              //THEM VAO BANG CHI TIET SUAT AN
              if(dataResult){
                    for(let i = 0; i < obj.chitietsuatan.length; i++){
                         const newChitietsuatan = this.chitietsuatanRepo.create(obj.chitietsuatan[i])
                         newChitietsuatan.ID_phieu = dataResult.Id_Phieu; //id_phieu
                         newChitietsuatan.Ma_vt = newChitietsuatan.Ma_vt;
                         //LAY GIA MA_VT
                         const sql = `select * from  FAMILY_WRK.dbo.Dmgia2 where Ma_vt = CAST('${obj.chitietsuatan[i].Ma_vt}' as varchar)`;
                         const data = await this.SV_FAMILYconnection.query(`${sql}`, []);
                         // console.log(newChitietsuatan.Ma_vt)
                         
                         newChitietsuatan.Gia = data[0]["Gia2"]; //Gia vt
                         newChitietsuatan.Dvt = data[0]["Dvt"]; //DVT
                         // newChitietsuatan.Ma_vt ="N"+newChitietsuatan.Ma_vt
                         // console.log(newChitietsuatan)
                         // this.chitietsuatanRepo.save(newChitietsuatan)
                         const sqlInsert =  `INSERT INTO FAMILY_WRK.dbo.Pos$ct66_EH ("ID_phieu", "Ma_vt", "So_luong", "Gia", "Dvt") 
                         VALUES (@0, @1, @2, @3, @4)`;
                         const data1 = await this.SV_FAMILYconnection.query(`${sqlInsert}`, [newChitietsuatan.ID_phieu,newChitietsuatan.Ma_vt,newChitietsuatan.So_luong,newChitietsuatan.Gia,newChitietsuatan.Dvt ]);

                    }                   
              }
          }
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
