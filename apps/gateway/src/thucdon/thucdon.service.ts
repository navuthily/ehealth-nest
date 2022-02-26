import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class ThucDonService {
  constructor(@InjectConnection() readonly connection: Connection) {}
  async get_all() {
    const stored = 
    `select * from  FAMILY_WRK.dbo.dmvt2
         where Su_dung=1
    `;
    const data = await this.connection.query(`${stored}`, []);
    return data;             
  }
}
