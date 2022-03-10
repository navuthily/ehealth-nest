import { Injectable } from '@nestjs/common';
import { ChuyenkhoaRepository } from './chuyenkhoa.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { ChuyenkhoaEntity } from './chuyenkhoa.entity';

@Injectable()
export class ChuyenkhoaService extends TypeOrmCrudService<ChuyenkhoaEntity> {
  constructor(
    @InjectRepository(ChuyenkhoaRepository) repo
  ) {
    super(repo);
  }
}
