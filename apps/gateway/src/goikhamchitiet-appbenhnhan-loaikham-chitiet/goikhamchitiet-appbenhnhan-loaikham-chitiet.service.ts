import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class GoiKhamChiTietAppBenhNhanLoaiKhamChiTietService {
  constructor(@InjectConnection() readonly connection: Connection) {}

  async exec_GD2_GoiKhamChiTiet_AppBenhNhan_LoaiKham_ChiTiet(
    id: number,
  ) {
    let stored = ` SELECT dlk.ID_LoaiKham,dlk.TenLoaiKham,nc.TenNhom NhomLoaiKham,gk.ID_GoiKhamChiTiet,gk.ID_GoiKham,dlk.GiaBaoChoBN,gk.BatBuoc_App
    FROM DM_LoaiKham dlk
    JOIN NhomCLS nc ON nc.ID_NhomCLS = dlk.ID_NhomCLS
    LEFT JOIN GoiKhamChiTiet gk ON gk.ID_LoaiKham = dlk.ID_LoaiKham AND gk.ID_GoiKham=@0`;

    const result =await this.connection.query(`${stored}`, [id]);
    result.map((index,key) => {
        index.id = key;
    })
    return result;
  }
}
