import { Injectable } from '@nestjs/common';
import { DmhopdongRepository } from './dmhopdong.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DmhopdongEntity } from './dmhopdong.entity';

@Injectable()
export class DmhopdongService extends TypeOrmCrudService<DmhopdongEntity> {
  constructor(
    @InjectRepository(DmhopdongRepository) repo
  ) {
    super(repo);
  }
}
