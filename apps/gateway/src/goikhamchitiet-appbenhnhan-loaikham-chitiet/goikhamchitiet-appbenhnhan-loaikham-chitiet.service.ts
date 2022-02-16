import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import _ from 'lodash';
import { Connection } from 'typeorm';

@Injectable()
export class GoiKhamChiTietAppBenhNhanLoaiKhamChiTietService {
  constructor(@InjectConnection() readonly connection: Connection) { }

  async exec_GD2_GoiKhamChiTiet_AppBenhNhan_LoaiKham_ChiTiet(
    id: number,
  ) {
    let stored = ` SELECT dlk.ID_LoaiKham,dlk.TenLoaiKham,nc.TenNhom NhomLoaiKham,gk.ID_GoiKhamChiTiet,gk.ID_GoiKham,dlk.GiaBaoChoBN,gk.BatBuoc_App
    FROM DM_LoaiKham dlk
    JOIN NhomCLS nc ON nc.ID_NhomCLS = dlk.ID_NhomCLS
    LEFT JOIN GoiKhamChiTiet gk ON gk.ID_LoaiKham = dlk.ID_LoaiKham AND gk.ID_GoiKham=@0`;

    const result = await this.connection.query(`${stored}`, [id]);
    result.map((index: { id: any; }, key: any) => {
      index.id = key;
    })
    return result;
  }

  async getGoiKhamStuff(id_loaikham: number) {
    const data = await this.connection.query(`
      SELECT gk.ID_GoiKham, gk.TenGoiKham, gk.MoTa, gk.SoTienDuKien, gk.GhiChu, dmlk.TenLoaiKham, dmlk.YNghia, gd2dmlk.NoiDungLoiKhuyen
      FROM GoiKham gk
      JOIN GoiKhamChiTiet gkct on gk.ID_GoiKham = gkct.ID_GoiKham
      JOIN DM_LoaiKham dmlk on gkct.ID_LoaiKham = dmlk.ID_LoaiKham
      LEFT JOIN Gd2_DanhMuc_LoiKhuyen gd2dmlk on dmlk.LoiKhuyen_App = gd2dmlk.Id_Auto
      where gk.ID_GoiKham in (
        SELECT distinct gkct2.ID_GoiKham from GoiKhamChiTiet gkct2
        where gkct2.ID_LoaiKham = @0
      )
    `, [id_loaikham]);
    return data;
  }

  groupGoiKham(data: any) {
    const result: any[] = _(data)
      .groupBy('ID_GoiKham')
      .map(function (items, ID_GoiKham) {
        return {
          ID_GoiKham: +ID_GoiKham,
          dataTenLoaiKham: _.map(items, 'TenLoaiKham'),
          dataYNghia: _.map(items, 'YNghia'),
          dataNoiDungLoiKhuyen: _.map(items, 'NoiDungLoiKhuyen'),
        };
      }).value();

    result.forEach(element => {
      element.dataTenLoaiKham = element.dataTenLoaiKham.filter((item: null) => item != null).join(", ");
      element.dataYNghia = element.dataYNghia.filter((item: null) => item != null).join(", ");
      element.dataNoiDungLoiKhuyen = element.dataNoiDungLoiKhuyen.filter((item: null) => item != null).join(", ");
    });
    return result;
  }
}
