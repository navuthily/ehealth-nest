import { Injectable } from '@nestjs/common';
import { DmloaikhoiRepository } from './dmloaikhoi.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DmloaikhoiEntity } from './dmloaikhoi.entity';

@Injectable()
export class DmloaikhoiService extends TypeOrmCrudService<DmloaikhoiEntity> {
  constructor(
    @InjectRepository(DmloaikhoiRepository) repo
  ) {
    super(repo);
  }
}
