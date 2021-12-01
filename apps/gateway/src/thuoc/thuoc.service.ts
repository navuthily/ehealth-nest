import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class ThuocService {
  constructor(@InjectConnection() readonly connection: Connection) {}
  async exec_gd2_dmthuoc() {
    const stored = `SET NOCOUNT ON;
     SELECT dt.MaThuoc
           ,dt.ID_Thuoc
           ,dt.TenGoc
           ,dt.TenBietDuoc
           ,dt.ID_DonViTinh
           ,dt.ID_DuongDung
           ,dt.LaThuoc
           ,dt.ThuocBHYT
           ,dt.BHYTNoiTruOrNgTru
           ,ddvt.TenDonViTinh
           ,dt.DonGia_BHYT
           ,dn.TenNhaSanXuat
           ,dnsx.TenDayDu
           ,dt.HideVienPhi
           ,dt.HideBHYT
           ,dt.HideBHYT_traituyen
           ,dt.HideBHYT_dungtuyen
           ,GD2_DMGiaban.Giaban     DonGia
           ,dt.[Active]
           ,(
                SELECT STUFF(
                           (
                               SELECT ';'+CONVERT(VARCHAR ,DM_HoatChat.ID_HoatChat)--  ,DM_HoatChat.ID_HoatChat
                               FROM   Thuoc_HoatChat
                                      INNER JOIN DM_HoatChat
                                           ON  DM_HoatChat.ID_HoatChat = Thuoc_HoatChat.ID_HoatChat
                               WHERE  ID_Thuoc = dt.ID_Thuoc 
                                      FOR XML PATH('')
                           )
                          ,1
                          ,1
                          ,''
                       )
            )                    AS [ID_HoatChat]
           ,(
                SELECT STUFF(
                           (
                               SELECT N';'+CONVERT(NVARCHAR ,DM_HoatChat.tenhoatchat)--  ,DM_HoatChat.ID_HoatChat
                               FROM   Thuoc_HoatChat
                                      INNER JOIN DM_HoatChat
                                           ON  DM_HoatChat.ID_HoatChat = Thuoc_HoatChat.ID_HoatChat
                               WHERE  ID_Thuoc = dt.ID_Thuoc 
                                      FOR XML PATH('')
                           )
                          ,1
                          ,1
                          ,''
                       )
            )                    AS HoatChatChinh
     FROM   DM_Thuoc dt
            JOIN DM_DonViTinh ddvt
                 ON  ddvt.ID_DonViTinh = dt.ID_DonViTinh
            LEFT JOIN DM_NuocSanXuat dnsx
                 ON  dnsx.ID_NuocSanXuat = dt.ID_NuocSanXuat
            LEFT JOIN DM_NSXThuoc dn
                 ON  dn.ID_NSXThuoc = dt.ID_NSXThuoc
            OUTER APPLY (
         SELECT TOP 1         Giaban
         FROM   GD2_DMGiaban
         WHERE  Ngayapdung<= GETDATE()
                AND ACTIVE = 1
                AND GD2_DMGiaban.ID_Thuoc = dt.ID_Thuoc
         ORDER BY
                id_giaban     DESC
     )                              GD2_DMGiaban
     -- WHERE dt.[Active]=1
     ORDER BY
            dt.TenGoc`;
    const data = await this.connection.query(`${stored}`);
    return data;
  }
  trans_gd2_dmthuoc(data: any) {
    let chuoitrave = {};
    let chuoi2 = '';
    const TraVe = {};
    const phancach = ',';
    if (data.length == 0) {
      chuoitrave += '{}|||[]';
    } else {
      TraVe['rows'] = [];
      chuoi2 = '[';
      for (let index = 0; index < data.length; ++index) {
        const row = data[index];
        if (row.Active == 1) {
          if (row.LaThuoc == 0) {
            row.LaThuoc = 1;
          } else {
            row.LaThuoc = 0;
          }
          if (row.DonGia_BHYT !== null) {
            row.DonGia_BHYT = row.DonGia_BHYT;
          } else {
            row.DonGia_BHYT = 0;
          }
          const tam = {
            id: row.ID_Thuoc,
            cell: [
              row.TenGoc,
              row.HoatChatChinh,
              row.MaThuoc,
              row.ID_DuongDung,
              row.DonGia,
              row.ID_DonViTinh,
              +row.LaThuoc,
              +row.ThuocBHYT,
              +row.BHYTNoiTruOrNgTru,
              row.DonGia_BHYT,
              row.TenNhaSanXuat,
              row.TenDayDu,
              +row.HideVienPhi,
              +row.HideBHYT,
              +row.HideBHYT_traituyen,
              +row.HideBHYT_dungtuyen,
              row.TenDonViTinh,
            ],
          };
          chuoi2 += row.ID_Thuoc + phancach;
          TraVe['rows'].push(tam);
        }
      }
      chuoi2 = `${chuoi2.slice(0, -1)}]`;
    }
//     chuoitrave = `${JSON.stringify(TraVe)}|||${chuoi2}`;
    chuoitrave = { dmThuoc: JSON.stringify(TraVe), idThuoc: chuoi2 };
    return chuoitrave;
  }
}
