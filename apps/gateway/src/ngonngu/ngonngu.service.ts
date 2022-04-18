import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { DMlanguageEntity } from './ngonngu.entity';
import { InjectConnection } from '@nestjs/sequelize';

// const  result = {
//   "vi": {
//      "translation": {
//           "benhnhan": "Bệnh nhân",
//           "nhanvien": "Nhân viên",
//           "datlichkham": "Đặt lịch khám"
//      } 
//   }

// }


@Injectable()
export class DMlanguageService {
  constructor(
    @InjectConnection("SV_THANHVIEN_") private SV_THANHVIENconnection: Connection,


     @InjectRepository(DMlanguageEntity, "SV_THANHVIEN_") private ngonnguRepo: Repository<DMlanguageEntity>,

  ) { }


  async getLanguageByCode(){
    const data = await this.SV_THANHVIENconnection
    .getRepository(DMlanguageEntity)
    .createQueryBuilder("gd2_dm_language")
    .where("gd2_dm_language.code = :code", { code: "kr" })
    .leftJoinAndSelect("gd2_dm_language.labelToLanguages", "gd2_label_language")
    .leftJoinAndSelect("gd2_label_language.label", "gd2_dm_label")
    .getOneOrFail()

    const objLanguage = {};
    const key = data["code"]
    if(key){
      objLanguage[key] = {}
      objLanguage[key]["translation"] = {}
      const obj = objLanguage[key]["translation"];
      for(let i = 0; i < data["labelToLanguages"].length; i++){
        obj[data["labelToLanguages"][i]["label"]["keyname"]] = data["labelToLanguages"][i]["value"];
       
      }


      return objLanguage

    }else{
      return null
    }


  }



}
