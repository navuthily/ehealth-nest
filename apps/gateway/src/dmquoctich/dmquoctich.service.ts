import { Injectable } from '@nestjs/common';
import { DmquoctichRepository } from './dmquoctich.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DmquoctichEntity } from './dmquoctich.entity';

@Injectable()
export class DmquoctichService extends TypeOrmCrudService<DmquoctichEntity> {
  constructor(
    @InjectRepository(DmquoctichRepository) repo
  ) {
    super(repo);
  }
}
