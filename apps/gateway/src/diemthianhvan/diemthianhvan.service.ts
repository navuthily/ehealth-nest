import { Injectable } from '@nestjs/common';
import { DiemthianhvanRepository } from './diemthianhvan.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DiemthianhvanEntity } from './diemthianhvan.entity';

@Injectable()
export class DiemthianhvanService extends TypeOrmCrudService<DiemthianhvanEntity> {
  constructor(
    @InjectRepository(DiemthianhvanRepository) repo
  ) {
    super(repo);
  }
}
