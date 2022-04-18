import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ToDieuTriRepository } from './todieutri.repository';
import { ToDieuTriEntity } from './todieutri.entity';
import { Connection } from 'typeorm';
import { DonthuocEntity } from '../donthuoc/donthuoc.entity'
import { DonthuoctralaiEntity } from '../donthuoctralai/donthuoctralai.entity';


@Injectable()
export class ToDieuTriService extends TypeOrmCrudService<ToDieuTriEntity> {
  constructor(
    @InjectRepository(ToDieuTriRepository) repo,
    @InjectConnection() readonly connection: Connection,
  ) {
    super(repo);



  }

  async getDonthuocs(id_donthuoc){
      const donthuocs = await this.connection
      .getRepository(DonthuocEntity)
      .createQueryBuilder("dt")
      .leftJoinAndSelect("dt.donthuocchitiets",  "dtct")
      .leftJoinAndSelect("dtct.dmthuoc",  "dmthuoc")
      .where('dtct.id_donthuoc IN (:...id_donthuoc)', { id_donthuoc } )
      .getOne()


      return donthuocs
  }

  async getDonthuoctralais(arrDttl){
    const donthuocs = await this.connection
    .getRepository(DonthuoctralaiEntity)
    .createQueryBuilder("dttl")
    .leftJoinAndSelect("dttl.donthuoctralaichitiets",  "dttlct")
    .leftJoinAndSelect("dttlct.dmthuoc",  "dmthuoc")
    .where('dttlct.id_donthuoctralai IN (:...arrDttl)', { arrDttl } )
    .getMany()


    return donthuocs
  }



  



}
