import { Injectable } from '@nestjs/common';
import { DmphongbanRepository } from './dmphongban.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DmphongbanEntity } from './dmphongban.entity';

@Injectable()
export class DmphongbanService extends TypeOrmCrudService<DmphongbanEntity> {
  constructor(
    @InjectRepository(DmphongbanRepository) repo
  ) {
    super(repo);
  }
}
