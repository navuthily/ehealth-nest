import { InjectQueue, Processor } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectConnection } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { Connection } from 'typeorm';
import { dataFilterDTO } from './dto/dataFilter.dto';


@Injectable()
export class BenhAnNoiTruService {
  constructor(
    @InjectConnection() readonly connection: Connection,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
     return data;
             
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

 

}
