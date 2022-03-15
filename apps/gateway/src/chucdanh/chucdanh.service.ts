import { Injectable } from '@nestjs/common';
import { ChucdanhRepository } from './chucdanh.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { ChucdanhEntity } from './chucdanh.entity';

@Injectable()
export class ChucdanhService extends TypeOrmCrudService<ChucdanhEntity> {
  constructor(
    @InjectRepository(ChucdanhRepository) repo
  ) {
    super(repo);
  }
}
