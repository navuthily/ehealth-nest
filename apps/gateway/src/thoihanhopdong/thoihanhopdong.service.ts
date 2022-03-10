import { Injectable } from '@nestjs/common';
import { ThoihanhopdongRepository } from './thoihanhopdong.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { ThoihanhopdongEntity } from './thoihanhopdong.entity';

@Injectable()
export class ThoihanhopdongService extends TypeOrmCrudService<ThoihanhopdongEntity> {
  constructor(
    @InjectRepository(ThoihanhopdongRepository) repo
  ) {
    super(repo);
  }
}
