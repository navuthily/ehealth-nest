import { Injectable } from '@nestjs/common';
import { TinhtranghonnhanRepository } from './tinhtranghonnhan.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { TinhtranghonnhanEntity } from './tinhtranghonnhan.entity';

@Injectable()
export class TinhtranghonnhanService extends TypeOrmCrudService<TinhtranghonnhanEntity> {
  constructor(
    @InjectRepository(TinhtranghonnhanRepository) repo
  ) {
    super(repo);
  }
}
