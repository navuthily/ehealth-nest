import { Injectable } from '@nestjs/common';
import { NhanvienbangcapRepository } from './nhanvienbangcap.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { NhanvienbangcapEntity } from './nhanvienbangcap.entity';

@Injectable()
export class NhanvienbangcapService extends TypeOrmCrudService<NhanvienbangcapEntity> {
  constructor(
    @InjectRepository(NhanvienbangcapRepository) repo
  ) {
    super(repo);
  }
}
