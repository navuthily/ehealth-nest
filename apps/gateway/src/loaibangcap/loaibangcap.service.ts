import { Injectable } from '@nestjs/common';
import { LoaibangcapRepository } from './loaibangcap.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { LoaibangcapEntity } from './loaibangcap.entity';

@Injectable()
export class LoaibangcapService extends TypeOrmCrudService<LoaibangcapEntity> {
  constructor(
    @InjectRepository(LoaibangcapRepository) repo
  ) {
    super(repo);
  }
}
