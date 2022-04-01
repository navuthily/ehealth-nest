import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DonthuocEntity } from './donthuoc.entity';
import { DonthuocRepository } from './Donthuoc.repository';

@Injectable()
export class DonThuocService extends TypeOrmCrudService<DonthuocEntity> {
  constructor(
    @InjectRepository(DonthuocRepository) repo
  ) {
    super(repo);
  }
}
