import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { CauHinhToolCap2Repository } from './cauhinhtoolcap2.repository';
import { CauHinhToolCap2Entity } from './cauhinhtoolcap2.entity';


@Injectable()
export class CauHinhToolCap2Service extends TypeOrmCrudService<CauHinhToolCap2Entity> {
  constructor(
    @InjectRepository(CauHinhToolCap2Repository) repo
  ) {
    super(repo);
  }



  getAll(){
    return this.repo.find()
  }
}
