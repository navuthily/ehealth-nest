import { Injectable } from '@nestjs/common';
import { DmtinhthanhphoRepository } from './dmtinhthanhpho.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DmtinhthanhphoEntity } from './dmtinhthanhpho.entity';

@Injectable()
export class DmtinhthanhphoService extends TypeOrmCrudService<DmtinhthanhphoEntity> {
  constructor(
    @InjectRepository(DmtinhthanhphoRepository) repo
  ) {
    super(repo);
  }
}
