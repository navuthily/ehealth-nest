import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { CauHinhToolCap1Repository } from './cauhinhtoolcap1.repository';
import { CauHinhToolCap1Entity } from './cauhinhtoolcap1.entity';


@Injectable()
export class CauHinhToolCap1Service extends TypeOrmCrudService<CauHinhToolCap1Entity> {
  constructor(
    @InjectRepository(CauHinhToolCap1Repository) repo
  ) {
    super(repo);
  }



  getAll(){
    return this.repo.find()
  }
}
