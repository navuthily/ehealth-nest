import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { ToDieuTriRepository } from './todieutri.repository';
import { ToDieuTriEntity } from './todieutri.entity';



@Injectable()
export class ToDieuTriService extends TypeOrmCrudService<ToDieuTriEntity> {
  constructor(
    @InjectRepository(ToDieuTriRepository) repo
  ) {
    super(repo);



  }



  



}
