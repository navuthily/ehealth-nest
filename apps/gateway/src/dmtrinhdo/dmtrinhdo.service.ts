import { Injectable } from '@nestjs/common';
import { DmtrinhdoRepository } from './dmtrinhdo.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DmtrinhdoEntity } from './dmtrinhdo.entity';

@Injectable()
export class DmtrinhdoService extends TypeOrmCrudService<DmtrinhdoEntity> {
  constructor(
    @InjectRepository(DmtrinhdoRepository) repo
  ) {
    super(repo);
  }
}
