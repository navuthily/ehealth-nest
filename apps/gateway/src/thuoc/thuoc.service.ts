import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {} from 'sequelize-typescript';
import { Connection } from 'typeorm';
const sql = require('mssql');
@Injectable()
export class ThuocService {
  constructor(
    @InjectConnection() readonly connection: Connection, // @InjectConnectionSequelize() readonly connectionSequelize,
  ) {}
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
  
  async exec_gd2_thuoc_selectall_tam() {
    const stored = `SET NOCOUNT ON
    ;WITH k1 
         AS (
             SELECT ID_NhomThuoc     AS ID_Thuoc
                   ,ID_NhomThuocCha  AS ID_NhomThuoc
                   ,TenNhomThuoc     AS TenBietDuoc
                   ,0                AS isleaf
             FROM   DM_NhomThuoc
         ) 
         ,k2 AS
         (
             SELECT ID_Thuoc
                   ,TenBietDuoc
                   ,ID_NhomThuoc
                   ,isleaf
                   ,nLevel = 1
                   ,Family = ID_Thuoc
             FROM   k1
             WHERE  ID_NhomThuoc IS NULL
                    OR ID_NhomThuoc = 0
             UNION ALL   
             SELECT E.ID_Thuoc
                   ,E.TenBietDuoc
                   ,E.ID_NhomThuoc
                   ,E.isleaf
                   ,H.nLevel+1
                   ,Family
             FROM   k1 E
                    JOIN k2 H
                         ON  E.ID_NhomThuoc = H.ID_Thuoc
         )
         ,k3 AS (
             SELECT dt.ID_Thuoc
                   ,dt.TenBietDuoc
                   ,k2.ID_Thuoc  AS ID_NhomThuoc
                   ,1            AS isleaf
                   ,nLevel+1     AS nLevel
                   ,Family
             FROM   DM_Thuoc     AS dt
                    LEFT JOIN k2
                         ON  dt.ID_NhomThuoc = k2.ID_Thuoc
             
             UNION ALL 
             SELECT *
             FROM   k2
         )
      
    ,k4 AS (
          SELECT k3.*
                ,(
                     SELECT STUFF(
                                (
                                    SELECT N';'+CONVERT(NVARCHAR(MAX) ,DM_HoatChat.tenhoatchat)
                                    FROM   Thuoc_HoatChat
                                           INNER JOIN DM_HoatChat
                                                ON  DM_HoatChat.ID_HoatChat = Thuoc_HoatChat.ID_HoatChat
                                    WHERE  Thuoc_HoatChat.ID_Thuoc = k3.ID_Thuoc 
                                           FOR XML PATH('')
                                )
                               ,1
                               ,1
                               ,''
                            )
                 )                      AS HoatChatChinh
                ,DM_NhomThuoc.ID_NhomThuocCha
                ,DM_Thuoc.TenGoc
                ,DM_Thuoc.TenKhac
                ,DM_Thuoc.HamLuong
                ,DM_Thuoc.ID_NuocSanXuat
                ,DM_Thuoc.ID_NhomBenh
                ,DM_Thuoc.ID_DonViTinh
                ,DM_Thuoc.ID_DuongDung
                ,DM_Thuoc.SoLuongQuyDoi
                ,DM_Thuoc.ID_DonViTinhQuyDoi
                ,DM_Thuoc.DonGia
                ,DM_Thuoc.TonKhoToiThieu
                ,DM_Thuoc.GhiChu
                ,DM_Thuoc.LaThuoc
                ,DM_Thuoc.Active
                ,DM_Thuoc.DoUuTien
                ,DM_Thuoc.ThuocBHYT
                ,DM_Thuoc.QuyCach
                ,DM_Thuoc.HeSoDieuChinhGiaBan
                ,DM_Thuoc.BHYTNoiTruOrNgTru
                ,DM_Thuoc.PhanTramThue
                ,DM_Thuoc.ID_NSXThuoc
                ,DM_Thuoc.MaThuoc
                ,DM_NuocSanXuat.TenDayDu
                ,DM_NSXThuoc.TenNhaSanXuat
                ,DM_DonViTinh.TenDonViTinh
                ,DM_Thuoc.DonGia_BHYT
                ,DM_Thuoc.HideVienPhi
                ,DM_Thuoc.HideBHYT
                ,DM_Thuoc.PhanHangBV
                ,DM_Thuoc.SignNumber
                ,CASE 
                      WHEN isleaf=0 THEN k3.ID_Thuoc
                      ELSE k3.ID_NhomThuoc
                 END                       nhomthuoctam
                ,DM_Thuoc.MaBHYT
                ,DM_Thuoc.HideBHYT_traituyen
                ,DM_Thuoc.HideBHYT_dungtuyen
                ,DM_Thuoc.CoSoTuTruc
                ,DM_Thuoc.BaoDongDo
                ,DM_Thuoc.BaoDongVang
                ,DM_Thuoc.MaSoTheoDMBHYT
                ,DM_Thuoc.Id_NhomThuoc_Toa
                ,ID_NhomBHYT
                ,STT_BHYT
                ,MaThuoc_BV
                ,MaThuoc_BHYT
                ,HoatChat_BHYT
                ,MaDuongDung_BHYT
                ,DuongDung_BHYT
                ,DongGoi_BHYT
                ,Gia_BHYT_Thanhtoan
                ,DinhMuc_BHYT
                ,NhietDo_DoAm
                ,HamLuong_BHYT
                ,ThongTinThauBHYT
                ,DM_Thuoc.GiaBHYTSoLe
                ,DM_Thuoc.Is_Print_Lohandung
                ,DM_Thuoc.HideVienPhiNgoaiTru
                ,DM_Thuoc.IsVatTu
                ,gdh.tenhang
                ,DM_Thuoc.hang_id
                ,DM_Thuoc.HamLuongVTTH
                ,DM_Thuoc.DVTVTTH
          FROM   k3
                 LEFT JOIN DM_NhomThuoc
                      ON  k3.ID_NhomThuoc = DM_NhomThuoc.ID_NhomThuoc
                 LEFT JOIN DM_Thuoc
                      ON  k3.ID_Thuoc = DM_Thuoc.ID_Thuoc
                 LEFT JOIN DM_NuocSanXuat
                      ON  DM_NuocSanXuat.ID_NuocSanXuat = DM_Thuoc.ID_NuocSanXuat
                 LEFT JOIN DM_NSXThuoc
                      ON  DM_NSXThuoc.ID_NSXThuoc = DM_Thuoc.ID_NSXThuoc
                 LEFT JOIN DM_DonViTinh
                      ON  DM_DonViTinh.ID_DonViTinh = DM_Thuoc.ID_DonViTinh
                          --huy viêt LEFT JOIN vào bảng dm hạng
                          
                 LEFT JOIN GD2_DM_Hang  AS gdh
                      ON  DM_Thuoc.hang_id = gdh.id
      )
      
      SELECT *
      FROM   k4
      ORDER BY
             Family
            ,nhomthuoctam  ASC
            ,tengoc        ASC`;
    const data = await this.connection.query(`${stored}`);
    data.map((item: any) => {
      let hide = '';
      if (item['HideBHYT_traituyen'] == 1) {
        hide = '1';
      }
      if (item['HideVienPhi'] == 1) {
        hide = '2';
      }
      item['id'] = item['ID_Thuoc'];
      item['ID_thuoc'] = item['ID_Thuoc'];
      item['parent'] = item['ID_NhomThuoc'];
      item['indent'] = item['nLevel'];
      item['NuocSanXuat'] = item['TenDayDu'];
      item['HangSanXuat'] = item['TenNhaSanXuat'];
      item['ShowLoHanDung'] = item['Is_Print_Lohandung'];
      item['hide'] = hide;
      item['LaThuoc'] = item['LaThuoc'] == null ? '' : item['LaThuoc'] ? 1 : 0;
      item['Active'] = item['Active'] == null ? '' : item['Active'] ? 1 : 0;
      if (item['DonGia']) {
        item['Giasauthue'] = Math.round(
          item['DonGia'] * (1 + item['PhanTramThue'] / 100),
        );
      } else {
        item['Giasauthue'] = null;
      }
      if (item['DonGia']) {
        item['Giaban'] = Math.round(
          item['DonGia'] *
            (1 + item['PhanTramThue'] / 100) *
            (1 + item['HeSoDieuChinhGiaBan'] / 100),
        );
      } else {
        item['Giaban'] = null;
      }
      item['GiaBHYTSoLe'] = item['GiaBHYTSoLe']
        ? item['GiaBHYTSoLe'].toFixed(2)
        : item['GiaBHYTSoLe'];
      item['HeSoDieuChinhGiaBan'] = item['HeSoDieuChinhGiaBan']
        ? item['HeSoDieuChinhGiaBan'].toFixed(2)
        : item['HeSoDieuChinhGiaBan'];
      return item;
    });
    return data;
  }

  async exec_gd2_get_cauhinh_new(param: any) {
    return await this.connection.query(`GD2_get_cauhinh_new '${param}'`);
  }

  async exec_gd2_quanly_dieukienupdate(params: any) {
    return await this.connection.query(
      `GD2_Quanly_dieukienupdate ${params.id_luotkham}, ${params.id_donthuoc}, ${params.id_kham}, ${params.id_phy}, ${params.id_dtph}, ${params.id_user}, ${params.id_benhnhan}, ${params.sid}, ${params.loaikiemtra}, '${params.ip_client}'`,
    );
  }

  async exec_gd2_thuoc_quanlyxuat(params: any) {
    const { xml, IP, ID_Kho, ID_NhanVien, out, ID_XuatKho } = params;
    const connection = await new sql.ConnectionPool({
      dialect: 'mssql',
      host: '192.168.1.107',
      server: '192.168.1.107',
      port: 1433,
      user: 'dev',
      password: '1234',
      database: 'EhealthRea_dev',
      options: {
        encrypt: false,
        trustServerCertificate: false,
      },
    }).connect();
    const request = new sql.Request(connection);
    const input = { xml, IP, ID_Kho, ID_NhanVien };
    const output = { out, ID_XuatKho };
    Object.keys(input).forEach((key) => {
      request.input(key, input[key]);
    });
    Object.keys(output).forEach((key) => {
      request.output(key);
    });
    const result = await request.execute('GD2_Thuoc_QuanLyXuat');

    return result;
  }

  async exec_gd2_quanlydieukienupdatenew(params: any) {
    return await this.connection.query(
      `EXEC GD2_QuanLyDieuKienUpdateNew @0, @1`,
      [params.function, params.xml],
    );
  }

  async exec_gd2_check_phieulinhthuocnoitru(params: any) {
    return await this.connection.query(
      `EXEC GD2_Check_PhieuLinhThuocNoiTru @0`,
      [params.ID_PhieuLinhThuoc],
    );
  }

  async exec_gd2_checkphieunhapxuattrunggian_daduyet(params: any) {
    return await this.connection.query(
      `EXEC GD2_CheckPhieuNhapXuatTrungGian_DaDuyet @0`,
      [params.ID_PhieuTrungGian],
    );
  }

  getIP(req: any) {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (ip.substr(0, 7) == '::ffff:') {
      ip = ip.substr(7);
    }
    return ip;
  }

  createTable(data: any) {
    let table = '<table border=1 cellpadding=0 cellspacing=0>';
    table +=
      '<th>Tên thuốc</th><th>Tồn hiện tại</th><th>Số lượng xuất</th><th>Số lượng thiếu</th>';
    if (data) {
      for (let i = 0; i < data.length; i += 1) {
        table += '<tr>';
        table += `<td align='left'>${data[i].TenGoc}</td>`;
        table += `<td align='right'>${data[i].SoLuongConLai}</td>`;
        table += `<td align='right'>${data[i].SoThuocDeNghiTheoDon}</td>`;
        table += `<td align='right'>${
          data[i].SoThuocDeNghiTheoDon - data[i].SoLuongConLai
        }</td>`;
        table += '</tr>';
      }
      table += '</table>';
      return table;
    }
    return '';
  }
}
