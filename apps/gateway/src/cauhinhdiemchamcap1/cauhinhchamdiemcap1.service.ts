import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { CauHinhDiemChamCap1Repository } from './cauhinhchamdiemcap1.repository';
import { CauHinhDiemChamCap1Entity } from './cauhinhdiemchamcap1.entity';
import { InjectConnection } from '@nestjs/sequelize';

import { Connection, Repository, getRepository } from 'typeorm';
import { LichSuChamDiemCap1 } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.entity';


@Injectable()
export class  CauHinhDiemChamCap1Service extends TypeOrmCrudService< CauHinhDiemChamCap1Entity> {
  constructor(
    @InjectRepository( CauHinhDiemChamCap1Entity) repo,
   
  ) {
    super(repo);
  }



  async getKetQuaByIdLichSuDiem(id_tool: number, id_lichsu: number){
    const result = await getRepository(LichSuChamDiemCap1)
    .createQueryBuilder("ls1")
    .where("ls1.Id_AutoCap1 = :Id_AutoCap1", {Id_AutoCap1: id_lichsu}) //id_lichsu = 34
    .andWhere("ls2.Value = :Value", {Value: 1})
    .leftJoinAndSelect("ls1.lichsuchamdiemcap2s",  "ls2")
    .select('SUM(ls2.Diem)', 'diem')
    .getRawOne()

    // .getOne()



    const data = await getRepository(CauHinhDiemChamCap1Entity)
    .createQueryBuilder("c1")
    .leftJoinAndSelect("c1.cauhinhdiemchamcap2s",  "c2")
    .where("c1.SuDung = :SuDung", {SuDung: 1})
    .andWhere("c1.ID_Tool = :ID_Tool", {ID_Tool: id_tool}) //id_tool = 34
    .andWhere("c2.Diem = :Diem", { Diem: result["diem"] })
    .getOne()

    // return data;
    console.log(result["diem"])
    return data
  }
}
