import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { VatTu } from './vattu.entity';
import { VattuRepository } from './vattu.repository';

@Injectable()
export class VattuService extends TypeOrmCrudService<VatTu> {
  constructor(@InjectRepository(VattuRepository, 'SV_FAMILY_') repo) {
    super(repo);
  }

  // async updateVT(mavt, obj){
  //   const data = await this.repo.findOneOrFail({ Ma_vt: mavt })
  //   data.Ten_vt = obj.Ten_vt;
  //   return this.repo.save(data)
  // }
}
