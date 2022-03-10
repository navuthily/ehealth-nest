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
import { UpdateSuatAnDTO } from './dto/update-suatan-dto.dto';
import { UserEntity } from '../user/user.entity';
import dayjs from 'dayjs'

@Injectable()
export class SuatAnService {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectConnection("SV_FAMILY_") private SV_FAMILYconnection: Connection,
//     @InjectEntityManager("SV_FAMILY_") private entityManager: SuatAn

     @InjectRepository(SuatAn, "SV_FAMILY_") private suatanRepo: Repository<SuatAn>,
     @InjectRepository(ChiTietSuatAn, "SV_FAMILY_") private chitietsuatanRepo: Repository<ChiTietSuatAn>,
     @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) { }

     //lấy suất ăn theo id_phieu
     async getSuatAnByIdPhieu(id_phieu: number) {
          const data = await (await this.getSuatAn())
          .where("Pos$ph66_EH.Id_Phieu = :Id_Phieu", { Id_Phieu: id_phieu})
          .getMany()
          for(let i=0;i<data.length;i++){
               const nguoitao= await (await this.userRepo.findOneOrFail(data[i].Id_NguoiTao)).nickname
               data[i]={...data[i],nguoitao}
          }
 
          return data;       

     }

     //-------
     async getSuatAnByLkBuoiNgayLoai(id_luotkham, buoi, ngay, loai){
          console.log(ngay)
          const dayFomat = dayjs(ngay).format('YYYY/MM/DD');
          const suatan = await this.SV_FAMILYconnection.getRepository(SuatAn)
          .createQueryBuilder('Pos$ph66_EH')
          .where("Pos$ph66_EH.Id_LuotKham = :Id_LuotKham", {Id_LuotKham: id_luotkham})
          .andWhere('Pos$ph66_EH.Id_Buoi = :Id_Buoi', { Id_Buoi: buoi })
          .andWhere('Pos$ph66_EH.ngay_ct = :ngay_ct', { ngay_ct: dayFomat })
          .andWhere('Pos$ph66_EH.Loai = :Loai', { Loai: loai })
          .leftJoinAndSelect("Pos$ph66_EH.chitietsuatans",  "Pos$ct66_EH")
          .leftJoinAndSelect("Pos$ct66_EH.vattu",  "dmvt2")
          .getOne() //////--------------------------------------------
          console.log(suatan)
          return suatan
         


     }

     async getSuatAnByDay(ngay, id_luotkham: number) {
          const data = await (await this.getSuatAn())
          .where("Pos$ph66_EH.ngay_ct = :ngay_ct", {ngay_ct: ngay})
          .andWhere("Pos$ph66_EH.Id_LuotKham = :Id_LuotKham", {Id_LuotKham: id_luotkham})
          .getMany();

          for(let i=0;i<data.length;i++){
               const nguoitao= await (await this.userRepo.findOneOrFail(data[i].Id_NguoiTao)).nickname
               data[i]={...data[i],nguoitao}
          }
          return data;          
     }

     async getSuatAn(){
          const data = await this.SV_FAMILYconnection.getRepository(SuatAn)
          .createQueryBuilder("Pos$ph66_EH")
          .leftJoinAndSelect("Pos$ph66_EH.chitietsuatans",  "Pos$ct66_EH")
          .leftJoinAndSelect("Pos$ct66_EH.vattu",  "dmvt2")
          return data; 
     }


     async themsuatan(obj: ThemSuatAnDTO){
          // let dayjs = require('dayjs')
          const dayFomat = dayjs(obj.ngay_ct).format('YYYY/MM/DD');
          console.log("------",dayFomat)
          const suatan = await this.SV_FAMILYconnection.getRepository(SuatAn)
          .createQueryBuilder('Pos$ph66_EH')
          .where('Pos$ph66_EH.Id_Buoi = :Id_Buoi', { Id_Buoi: obj.Id_Buoi })
          .andWhere('Pos$ph66_EH.ngay_ct = :ngay_ct', { ngay_ct: dayFomat })
          .andWhere('Pos$ph66_EH.Id_LuotKham = :Id_LuotKham', { Id_LuotKham: obj.Id_LuotKham })
          .andWhere('Pos$ph66_EH.Loai = :Loai', { Loai: obj.Loai })
          .getOne()

          const ckeckDuyetdon = await this.checkDuyetDon(suatan)

          if(ckeckDuyetdon){
               return {
                    success: false,
                    message: "Đơn hàng đã được chốt!"
               }
          }

          const ckeckThongtinluotkham = await this.checkThongtinluotkham(obj.Id_LuotKham)
          if(ckeckThongtinluotkham){
               return {
                    success: false,
                    message: "Đơn hàng đã được thanh toán!"
               }
          }

          


          // console.log(suatan)
          if(suatan){
               return {
                    success: false,
                    message: "Đơn hàng đã đặt rồi !huhu",
                    suatan
               }
          }else{
                //NEU SUAT AN CHƯA DA TON TAI
               // THEM VAO BANG SUATAN
               const newSuatan = await this.suatanRepo.create(obj)
               // newSuatan.ngay_ct = dayFomat;
               const dataResult = await this.suatanRepo.save(newSuatan).catch(err => {
                    throw new HttpException({
                         message: err.message
                    }, HttpStatus.BAD_REQUEST);
               })
               console.log(dataResult.Id_Phieu)

              //THEM VAO BANG CHI TIET SUAT AN
              if(dataResult){
                    await  this.functionThemSuatAn(dataResult.Id_Phieu, obj);  
                    return {
                         success: true,
                         message: "Đơn hàng được đặt thành công!",
                         dataResult
                    }                
              }
           
          }
     }


     async updateSuatan(id_phieu: number, obj){
          console.log(id_phieu)
          const suatAn = await this.suatanRepo
          .createQueryBuilder('Pos$ph66_EH')
          .leftJoinAndSelect("Pos$ph66_EH.chitietsuatans",  "Pos$ct66_EH")
          .where('Pos$ph66_EH.Id_Phieu = :Id_Phieu', { Id_Phieu: id_phieu })
          .andWhere('Pos$ph66_EH.Loai = :Loai', { Loai: obj.Loai })
          .getOne()
          console.log(suatAn)



          if(suatAn){


               const ckeckDuyetdon = await this.checkDuyetDon(suatAn)
               if(ckeckDuyetdon){
                    return {
                         success: false,
                         message: "Đơn hàng đã được chốt. Không thể cập nhật!"
                    }
               }

               const ckeckThongtinluotkham = await this.checkThongtinluotkham(suatAn.Id_LuotKham)
               if(ckeckThongtinluotkham){
                    return {
                         success: false,
                         message: "Đơn hàng đã được thanh toán, không thể cập nhật!"
                    }
               }



               await this.delete(id_phieu)

               if(obj.chitietsuatan.length === 0){
                    //xoa luon suat an
                    const stored = 
                    `delete from  FAMILY_WRK.dbo.Pos$ph66_EH
                         where ID_phieu = ${id_phieu}
                    `;
                    await this.connection.query(`${stored}`, []);


                    //xóa hết tất cả bảng ct 
                    // await this.delete(id_phieu)
                    
                    return{
                         success: true,
                         message: "Huy suat an!"
                    }
               }else{
                    //update bảng ph
                    const suatAnHienTai = await this.suatanRepo.findOneOrFail({ Id_Phieu: id_phieu })
                    console.log(suatAnHienTai)
                    suatAnHienTai["Diengiai"] = obj.Diengiai;
                    suatAnHienTai["Loai"] = obj.Loai;
                    this.suatanRepo.save(suatAnHienTai)   
                    
                    await this.functionThemSuatAn(id_phieu, obj);

                    return{
                         success: true,
                         message: "Update thành công!"
                    }
               }

          }else{
               return{
                    success: false,
                    message: "Đơn hang không tồn tại!"
               }
          }
     
     }

     async functionThemSuatAn(id_phieu, obj: ThemSuatAnDTO){
          for(let i = 0; i < obj.chitietsuatan.length; i++){
               //LAY GIA MA_VT
               const sql = `select * from  FAMILY_WRK.dbo.Dmgia2 where Ma_vt = CAST('${obj.chitietsuatan[i].Ma_vt}' as varchar)`;
               const data = await this.SV_FAMILYconnection.query(`${sql}`, []);
               
               const sqlInsert =  `INSERT INTO FAMILY_WRK.dbo.Pos$ct66_EH ("ID_phieu", "Ma_vt", "So_luong", "Gia", "Dvt") 
               VALUES (@0, @1, @2, @3, @4)`;
               const data1 = await this.SV_FAMILYconnection.query(`${sqlInsert}`, [id_phieu,obj.chitietsuatan[i].Ma_vt,obj.chitietsuatan[i].So_luong,data[0]["Gia2"],data[0]["Dvt"] ]);

          } 
     }


     checkDuyetDon(suatan){
          if(suatan?.Id_NguoiDuyet){
               return true;
          }
     }

     async checkThongtinluotkham(id_luotkham){
          
          const stored = 
          `select * from  ThongTinLuotKham
               where ID_LuotKham = ${id_luotkham }
          `;
          const thongtinluotkham = await this.connection.query(`${stored}`, []);
          if(thongtinluotkham.length === 0){
               const error = {"Thongtinluotkham": "Không tìm thấy!"}
               throw new HttpException({error}, 401)
          }

          if(thongtinluotkham[0]["DaThanhToanBill"]){
               return true
          }          
     }


     //chỉ bảng ct
     async delete(id){
          const stored = 
          `delete from  FAMILY_WRK.dbo.Pos$ct66_EH
               where ID_phieu = ${id}
          `;
          await this.connection.query(`${stored}`, []);
     }
 

}
