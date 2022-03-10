import { Injectable } from '@nestjs/common';
import { DmnganhangRepository } from './dmnganhang.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DmnganhangEntity } from './dmnganhang.entity';

@Injectable()
export class DmnganhangService extends TypeOrmCrudService<DmnganhangEntity> {
  constructor(
    @InjectRepository(DmnganhangRepository) repo
  ) {
    super(repo);
  }
}
