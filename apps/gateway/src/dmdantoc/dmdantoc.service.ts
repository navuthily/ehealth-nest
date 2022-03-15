import { Injectable } from '@nestjs/common';
import { DmdantocRepository } from './dmdantoc.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DmdantocEntity } from './dmdantoc.entity';

@Injectable()
export class DmdantocService extends TypeOrmCrudService<DmdantocEntity> {
  constructor(
    @InjectRepository(DmdantocRepository) repo
  ) {
    super(repo);
  }
}
