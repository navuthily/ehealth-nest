import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class ThucDonService {
  constructor(@InjectConnection() readonly connection: Connection) {}
  async get_all() {
    const stored = 
    `	SELECT 
      d.Ma_vt  as ma_vt,
      d.Ten_vt as ten_vt,
      d.Dvt as dvt,
      g.Gia2 as gia       
      FROM FAMILY_WRK.dbo.dmvt2 d
      JOIN FAMILY_WRK.dbo.Dmgia2 g ON d.Ma_vt=g.Ma_vt
      WHERE d.Su_dung=1
      ORDER BY d.So_tt
    `;
    const data = await this.connection.query(`${stored}`, []);
    return data;             
  }
}
