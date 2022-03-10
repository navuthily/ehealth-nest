import { Injectable } from '@nestjs/common';
import { DmdonviRepository } from './dmdonvi.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DmdonviEntity } from './dmdonvi.entity';

@Injectable()
export class DmdonviService extends TypeOrmCrudService<DmdonviEntity> {
  constructor(
    @InjectRepository(DmdonviRepository) repo
  ) {
    super(repo);
  }
}
