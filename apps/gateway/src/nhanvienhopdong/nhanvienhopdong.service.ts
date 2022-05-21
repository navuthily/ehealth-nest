import { Injectable } from '@nestjs/common';
import { NhanvienhopdongRepository } from './nhanvienhopdong.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { NhanvienhopdongEntity } from './nhanvienhopdong.entity';

@Injectable()
export class NhanvienhopdongService extends TypeOrmCrudService<NhanvienhopdongEntity> {
  constructor(
    @InjectRepository(NhanvienhopdongRepository) repo
  ) {
    super(repo);
  }
}
