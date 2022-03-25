import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { ToDieuTriChiTietRepository } from './todieutrichitiet.repository';
import { ToDieuTriChiTietEntity } from './todieutrichitiet.entity';



@Injectable()
export class ToDieuTriChiTietService extends TypeOrmCrudService<ToDieuTriChiTietEntity> {
  constructor(
    @InjectRepository(ToDieuTriChiTietRepository) repo
  ) {
    super(repo);



  }



  



}
