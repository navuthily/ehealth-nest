import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class DMPhongBanService {
  constructor(@InjectConnection() readonly connection: Connection) {}
  async get_all() {
    const stored = `
    SELECT DM_PhongBan.ID_PhongBan 
    ,DM_PhongBan.TenPhongBan
    ,DM_PhongBan.MaVietTat
    ,STTNoiTru
    FROM   DM_PhongBan
    WHERE  Id_LoaiPBChuyenMon = 4
    ORDER BY STTNoiTru desc 
    `;
    const dataResponse = await this.connection.query(`${stored}`);
    dataResponse.map((item: any) => {
      item['id'] = item['ID_PhongBan'];
      item['name'] = item['MaVietTat'];
      return item;
    });
    return dataResponse;
  }
}
