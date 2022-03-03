import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class ThongTinLuotKhamService {
  constructor(@InjectConnection() readonly connection: Connection) { }

  async getThongTinLuotKhamByIdBenhNhan(idBenhNhan: number) {
    const data = await this.connection.query(`SELECT * FROM ThongTinLuotKham WHERE ID_BenhNhan = @0`, [idBenhNhan]);
    return data;
  }

  async getThongTinLuotKhamByIdLuotKham(idLuotKham: number) {
    const data = await this.connection.query(`SELECT * FROM ThongTinLuotKham WHERE ID_LuotKham = @0`, [idLuotKham]);
    return data;
  }

  async getLichHenKhamByIdLuotkham(idLuotKham: number) {
    const data = await this.connection.query(`SELECT * FROM GD2_DatLichOnline WHERE ID_LuotKham = @0`, [idLuotKham]);
    return data;
  }

  async getKhamByIdLuotKham(idLuotKham: number) {
    const data = await this.connection.query(`
      SELECT dmlk.TenLoaiKham, dmnv.NickName, k.*
      FROM Kham k
      join DM_LoaiKham dmlk on k.ID_LoaiKham = dmlk.ID_LoaiKham
      join DM_NhanVien dmnv on k.NguoiThucHien = dmnv.ID_NhanVien
      WHERE ID_LuotKham = 2911282
    `, [idLuotKham]);
    return data;
  }

  async getDieuTriPhoiHopByIdLuotKham(idLuotKham: number) {
    const data = await this.connection.query(`
      SELECT dmlk.TenLoaiKham, dmnv.NickName, dtph.*
      FROM DieuTriPhoiHop dtph
      JOIN Kham k ON dtph.ID_Kham = k.ID_Kham
      JOIN DM_LoaiKham dmlk on dtph.ID_LoaiKham = dmlk.ID_LoaiKham
      join DM_NhanVien dmnv on dtph.ID_NguoiThucHien = dmnv.ID_NhanVien
      WHERE k.ID_LuotKham = @0
    `, [idLuotKham]);
    return data;
  }

  async getPhysioByIdLuotKham(idLuotKham: number) {
    const data = await this.connection.query(`
      SELECT dmlk.TenLoaiKham, dmnv.NickName, phy.*
      FROM PHYSIOTHERAPY phy
      JOIN Kham k ON phy.ID_Kham = k.ID_Kham
      JOIN DM_LoaiKham dmlk on phy.ID_LoaiKham = dmlk.ID_LoaiKham
      join DM_NhanVien dmnv on phy.ID_NguoiThucHien = dmnv.ID_NhanVien
      WHERE k.ID_LuotKham = @0
    `, [idLuotKham]);
    return data;
  }
}
