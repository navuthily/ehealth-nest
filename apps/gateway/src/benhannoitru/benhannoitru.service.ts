import { InjectQueue, Processor } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectConnection } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { Connection } from 'typeorm';
import { dataFilterDTO } from './dto/dataFilter.dto';
import { SuatAn } from '../suatan/suatan.entity';


@Injectable()
export class BenhAnNoiTruService {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    @InjectConnection("SV_FAMILY_") private SV_FAMILYconnection: Connection,
  ) { }
 
  async getDanhSachNoiTru(id_khoa: number) {
     const stored = 
          `SELECT 
               mabenhnhan
               ,holotbenhnhan
               ,tenbenhnhan
               ,dbo.[GD2_tuoi](ttlk.ID_BenhNhan)tuoi
               ,dbo.GD2_LayGioiTinh(dbn.GioiTinh)gioitinh
               ,ISNULL(dbo.GD2_GetLoaiDoiTuong(gbant.ID_LuotKham),'')   doituong
               ,ISNULL(STUFF(
                    (
                         SELECT ','+ISNULL(gdgb1.TenBuong_Giuong ,gdgb.TenBuong_Giuong)
                         FROM   GD2_BenhAn_GiuongBenh AS gbagb(NOLOCK)
                                   LEFT JOIN GD2_DMBuong_GiuongBenh AS gdgb
                                        ON  gdgb.ID_Buong_Giuong = gbagb.Id_BuongGiuong
                                   LEFT JOIN GD2_DMBuong_GiuongBenh AS gdgb1
                                        ON  gdgb1.ID_Buong_Giuong = gdgb.ID_Parent
                         WHERE  gbagb.ID_LuotKham = gbant.ID_LuotKham
                                   AND gbagb.TrangThai<>'HuyBo'
                         GROUP BY
                                   ISNULL(gdgb1.TenBuong_Giuong ,gdgb.TenBuong_Giuong)
                         ORDER BY
                                   MAX(gbagb.Id_BenhAn_GiuongBenh) DESC
                                   
                                   FOR XML PATH('')
                    )
                    ,1
                    ,1
                    ,''
                    )      ,'')                         AS sophong
               ,ISNULL(nv.NickName  ,'')                 AS bsdieutri
               ,ISNULL(CD_KhoaDieuTri,'')              AS chandoan
               ,ISNULL(gdlba.Ten_LoaiBenhAnNoiTru ,'')                AS loaibenhan
               ,gbant.ID_BenhAnNoiTru
               ,gbant.ID_LuotKham
               ,dbn.ID_BenhNhan
               ,gbagb.TenBuong_Giuong
               ,gbant.NgayGioRaVien

               FROM   GD2_BenhAnNoiTru             AS gbant
                    LEFT JOIN ThongTinLuotKham   AS ttlk
                         ON  ttlk.ID_LuotKham = gbant.ID_LuotKham
                    LEFT JOIN DM_BenhNhan        AS dbn
                         ON  dbn.ID_BenhNhan = ttlk.ID_BenhNhan
                    LEFT JOIN DM_NhanVien nv
                         ON  gbant.ID_BacSyDieuTri = nv.ID_NhanVien
                    LEFT JOIN GD2_DM_LoaiBenhAn  AS gdlba
                         ON  gdlba.ID_LoaiBenhAnNoiTru = gbant.ID_LoaiBenhAnNoiTru
                    OUTER APPLY(
               SELECT TOP 1                     ID_PhongBan
               FROM   GD2_BenhAnNoiTru_Khoa  AS gbantk
               WHERE  gbantk.ID_BenhAnNoiTru = gbant.ID_BenhAnNoiTru
               ORDER BY
                    gbantk.ID_BenhAnNoiTru_Khoa DESC
               ) gbantk
               OUTER APPLY(
               SELECT TOP 1  gdgb.TenBuong_Giuong        
               FROM   GD2_BenhAn_GiuongBenh AS gbagb 
               LEFT JOIN GD2_DMBuong_GiuongBenh AS gdgb ON gbagb.Id_BuongGiuong=gdgb.ID_Buong_Giuong
               WHERE  gbagb.Id_LuotKham = gbant.Id_LuotKham
               AND gbagb.TrangThai<>'HuyBo'
               ORDER BY
                    gbagb.Id_BenhAn_GiuongBenh DESC
               ) gbagb
               WHERE  gbantk.ID_PhongBan = @0
               AND IsHoSoGop = 0
               AND (NgayGioRaVien IS NULL OR NgayGioRaVien>=GETDATE())
               AND dbn.ID_BenhNhan IS NOT NULL 
               ORDER BY
               TenBuong_Giuong DESC,gbant.ID_NguoiTaoBenhAn 
               DESC
          `;
     const data = await this.connection.query(`${stored}`, [id_khoa]);


     const thongtinsuatan = await this.getThongTinSuatAnBenhNhan(data)  
     
     console.log(1)
     for(let i = 0; i < data.length; i++){
          const result  = thongtinsuatan.filter(item => item.Id_LuotKham ===  data[i]["ID_LuotKham"])
          if(result.length === 0){
               data[i]["thongtinsuatan"] = false  //chưa đặt
          }else{
               data[i]["thongtinsuatan"] = true //đã đặt
          }
          
     }


     return data;
             
  }





  async getThongTinSuatAnBenhNhan(data){
     let dayjs = require('dayjs')
     const homnay =  new Date()
     let ngaymai =  new Date()
     
     ngaymai = dayjs(ngaymai.setDate(homnay.getDate() + 1)).format('YYYY/MM/DD');
     // console.log(ngaymai)

     let ids: number[] = [0];
     for(let i = 0; i < data.length; i++){
          ids.push(data[i]["ID_LuotKham"])
     }

     const dataSuatAn = await this.SV_FAMILYconnection.getRepository(SuatAn)
     .createQueryBuilder("Pos$ph66_EH")
     .select([
          "Pos$ph66_EH.Id_LuotKham",
     ])
     .leftJoinAndSelect("Pos$ph66_EH.chitietsuatans",  "Pos$ct66_EH")
     .where("Pos$ph66_EH.Id_LuotKham IN (:...ids)", { ids })
     .andWhere("Pos$ph66_EH.ngay_ct = :ngay_ct", { ngay_ct: ngaymai})
     .getMany()


     return dataSuatAn
     

  }


  async getDanhMucThucDon() {
     const stored = 
          `select * from  FAMILY_WRK.dbo.dmvt2
               where Su_dung=1
          `;
     const data = await this.connection.query(`${stored}`, []);
     return data;             
  }


  async getPhieuAn() {
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
