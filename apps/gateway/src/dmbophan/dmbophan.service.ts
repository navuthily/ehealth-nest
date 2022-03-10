import { Injectable } from '@nestjs/common';
import { DmbophanRepository } from './dmbophan.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DmbophanEntity } from './dmbophan.entity';

@Injectable()
export class DmbophanService extends TypeOrmCrudService<DmbophanEntity> {
  constructor(
    @InjectRepository(DmbophanRepository) repo
  ) {
    super(repo);
  }
}
