import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { Connection } from 'typeorm';

@Injectable()
export class GoiKhamService {
  constructor(@InjectConnection() readonly connection: Connection) {}
  async exec_GD2_GoiKham_SelectAll() {
    const stored = `SET NOCOUNT ON
    SELECT
        [ID_GoiKham],
        [TenGoiKham] +N' ['+CONVERT(NVARCHAR,dbo.GD2_FormatViewMoney((SELECT SUM(dlk.GiaBaoChoBN) GiaBaoChoBN FROM GoiKhamChiTiet gkct 
         JOIN DM_LoaiKham dlk ON gkct.ID_LoaiKham=dlk.ID_LoaiKham
         WHERE gkct.ID_GoiKham=gk.ID_GoiKham)))+']' AS TenGoiKhamN,
         gk.TenGoiKham,
        [MoTa],
        gk.[GhiChu],
        dnv.ID_NhanVien,
        dnv.NickName NguoiTao,
        gk.ID_NhomGoiKham,
        dmngk.TenNhom,
        (SELECT SUM(dlk.GiaBaoChoBN) as GiaBaoChoBN FROM GoiKhamChiTiet gkct 
         JOIN DM_LoaiKham dlk ON gkct.ID_LoaiKham=dlk.ID_LoaiKham
         WHERE gkct.ID_GoiKham=gk.ID_GoiKham) AS SoTienDuKien
         ,convert(nvarchar,gk.Tuoi_App_Min,102)+' tháng-'+convert(nvarchar,gk.Tuoi_App_Max,102)+' tháng' Tuoi_App
         ,gk.Tuoi_App_Min
         ,gk.Tuoi_App_Max
         ,gk.BatBuoc_App
         ,dmck.ID_ChuyenKhoa
         ,dmck.Ten as TenChuyenKhoa
    FROM
        [GoiKham] gk
        LEFT JOIN DM_NhanVien dnv ON gk.ID_NhanVien=dnv.ID_NhanVien
        LEFT JOIN  GD2_DM_NhomGoiKham dmngk ON gk.ID_NhomGoiKham=dmngk.ID_NhomGoiKham
        --Hiếu thêm để lấy ID_ChuyenKhoa và TenChuyenKhoa 
        LEFT JOIN GD2_Dm_ChuyenKhoa dmck ON gk.ID_ChuyenKhoa = dmck.ID_ChuyenKhoa
    
    order by ID_GoiKham desc`;
    const result = await this.connection.query(stored);
    result.map((index,key) => {
        index.id = key;
    })
    return result;
  }
}
