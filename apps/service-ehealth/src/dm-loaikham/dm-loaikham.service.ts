import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection, getRepository, Repository } from "typeorm";
import { DMLoaiKhamEntity } from "./dm-loaikham.entity";

@Injectable()
export class DMLoaikhamService {
  constructor(
     @InjectConnection() readonly connection: Connection,
  ) { }


    async getAll(){ 
      const data = await getRepository(DMLoaiKhamEntity)
      .createQueryBuilder('DM_LoaiKham')
      .getMany();
      return data
    }


    async getModuleName(){
          
      const stored = 
      `select * from ThanhVien.dbo.module
      `;
      const result = await this.connection.query(`${stored}`, []);
      return result 
    }


}