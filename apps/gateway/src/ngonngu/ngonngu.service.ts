import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { DMlanguageEntity } from './ngonngu.entity';
import { InjectConnection } from '@nestjs/sequelize';



@Injectable()
export class DMlanguageService {
  constructor(
    @InjectConnection("SV_THANHVIEN_") private SV_THANHVIENconnection: Connection,


     @InjectRepository(DMlanguageEntity, "SV_THANHVIEN_") private ngonnguRepo: Repository<DMlanguageEntity>,

  ) { }


  getAll(){
    return this.ngonnguRepo.find({ relations: ["labelToLanguages"] })
  }



}
