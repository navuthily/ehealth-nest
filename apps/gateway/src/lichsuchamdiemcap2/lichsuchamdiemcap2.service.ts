import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { LichSuChamDiemCap2Entity } from './lichsuchamdiemcap2.entity';
import { LichSuChamDiemCap2Repository } from './lichsuchamdiemcap2.repository';
import { Connection, getRepository } from 'typeorm';
import { LichSuChamDiemCap1Service } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.service';
import { Cap2DTO } from './dto/cap2DTO';


@Injectable()
export class LichSuChamDiemCap2Service extends TypeOrmCrudService<LichSuChamDiemCap2Entity> {
  constructor(
    @InjectRepository(LichSuChamDiemCap2Repository) repo,
    @InjectConnection() readonly connection: Connection,
  ) {
    super(repo);
  }

  async delete(id){
    if(id){
      const stored = 
      `delete from  Gd2_DA96_LichSuChamDiem_Cap2
          where Id_AutoCap1 = ${id}
      `;
      await this.connection.query(`${stored}`, []);     
      return true 
    }

  }

}
