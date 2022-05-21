import { Injectable } from '@nestjs/common';
import { ChucvuRepository } from './chucvu.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { ChucvuEntity } from './chucvu.entity';

@Injectable()
export class ChucvuService extends TypeOrmCrudService<ChucvuEntity> {
  constructor(
    @InjectRepository(ChucvuRepository) repo
  ) {
    super(repo);
  }
}
