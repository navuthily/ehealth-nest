import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DonthuocchitietRepository } from './donthuocchitiet.repository';
import { DonthuocchitietEntity } from './donthuocchitiet.entity';

@Injectable()
export class DonthuocchitietService extends TypeOrmCrudService<DonthuocchitietEntity> {
  constructor(
    @InjectRepository(DonthuocchitietRepository) repo
  ) {
    super(repo);
  }
}
