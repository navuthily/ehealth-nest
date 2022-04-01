import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { LichSuChamDiemCap1 } from './lichsuchamdiemcap1.entity';
import { LichSuChamDiemCap1Repository } from './lichsuchamdiemcap1.repository';


@Injectable()
export class LichSuChamDiemCap1Service extends TypeOrmCrudService<LichSuChamDiemCap1> {
  constructor(
    @InjectRepository(LichSuChamDiemCap1Repository) repo
  ) {
    super(repo);
  }



  async createLSCDC1(obj){
    const data = await this.repo.create(obj)
    return this.repo.save(data)
  }

  //tìm lscdcap1
  async updateCap1(obj){
    
    const data = await this.repo.findOne({ id: obj["ID_AutoCap1"] })
    if(data){
      data.KetQua = obj.ketqua;
      data.TongDiem = obj.TongDiem;     
      return this.repo.save(data) 
    }



    
    // 
  }
}
