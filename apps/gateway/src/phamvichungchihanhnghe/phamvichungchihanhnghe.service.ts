import { Injectable } from '@nestjs/common';
import { PhamvichungchihanhngheRepository } from './phamvichungchihanhnghe.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { PhamvichungchihanhngheEntity } from './phamvichungchihanhnghe.entity';

@Injectable()
export class PhamvichungchihanhngheService extends TypeOrmCrudService<PhamvichungchihanhngheEntity> {
  constructor(
    @InjectRepository(PhamvichungchihanhngheRepository) repo
  ) {
    super(repo);
  }
}
