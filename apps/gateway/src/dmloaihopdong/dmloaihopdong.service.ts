import { Injectable } from '@nestjs/common';
import { DmloaihopdongRepository } from './dmloaihopdong.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DmloaihopdongEntity } from './dmloaihopdong.entity';

@Injectable()
export class DmloaihopdongService extends TypeOrmCrudService<DmloaihopdongEntity> {
  constructor(
    @InjectRepository(DmloaihopdongRepository) repo
  ) {
    super(repo);
  }
}
