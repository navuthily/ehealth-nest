import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DMbenhnhanEntity } from './dmbenhnhan.entity';


@Injectable()
export class DMbenhnhanService {
  constructor(
    @InjectRepository(DMbenhnhanEntity) private dmbenhnhanRepo: Repository<DMbenhnhanEntity>,

  ) { }


  async getAvatar(id: number) {
    const data = await this.dmbenhnhanRepo.findOneOrFail({ ID_BenhNhan: id })
    // console.log(data.Avatar?.toString())

    if (data.Avatar) {
      const image = Buffer.from(data.Avatar)

      return image
    } else {
      return null
    }






  }





}
