import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class LanguageThongtinbenhvienService {
  constructor(@InjectConnection() readonly connection: Connection) {}

  async exec_multi_language_infomation_hospital(
    id: number,
    keyname: string,
    code: string,
  ) {
    let stored = `SELECT gd2lb.id ,gd2lblg.value as label,gd2lb.keyname as keyname  
    from GD2_ThongTinBenhVien ttbv
    join gd2_dm_label gd2lb  on  ttbv.Id_BenhVien=gd2lb.Id_BenhVien AND gd2lb.keyname in (${keyname})
    join gd2_label_language gd2lblg on gd2lblg.id_label = gd2lb.id 
    join gd2_dm_language L ON gd2lblg.id_language=L.ID AND L.code =@1
    where ttbv.Id_BenhVien = @0 and gd2lb.active = 1 and gd2lblg.active = 1 and L.active = 1`;

    let data = await this.connection.query(`${stored}`, [id,code]);
    return data;
  }
}
