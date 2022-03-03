import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class GD2DatLichOnlineService {
  constructor(@InjectConnection() readonly connection: Connection) { }

  async getLichHenKhamByIdBenhNhan(idBenhNhan: number) {
    const data = await this.connection.query(`SELECT * FROM GD2_DatLichOnline WHERE ID_BenhNhan = @0`, [idBenhNhan]);
    return data;
  }

  async getLichHenKhamByIdLuotkham(idLuotKham: number) {
    const data = await this.connection.query(`SELECT * FROM GD2_DatLichOnline WHERE ID_LuotKham = @0`, [idLuotKham]);
    return data;
  }
}
