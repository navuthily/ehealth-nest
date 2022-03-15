import { Injectable } from '@nestjs/common';
import { DmloaitinhluongRepository } from './dmloaitinhluong.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DmloaitinhluongEntity } from './dmloaitinhluong.entity';

@Injectable()
export class DmloaitinhluongService extends TypeOrmCrudService<DmloaitinhluongEntity> {
  constructor(
    @InjectRepository(DmloaitinhluongRepository) repo
  ) {
    super(repo);
  }
}
