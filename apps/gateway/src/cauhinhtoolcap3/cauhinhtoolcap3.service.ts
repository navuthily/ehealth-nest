import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { CauHinhToolCap3Repository } from './cauhinhtoolcap3.repository';
import { CauHinhToolCap3Entity } from './cauhinhtoolcap3.entity';


@Injectable()
export class CauHinhToolCap3Service extends TypeOrmCrudService<CauHinhToolCap3Entity> {
  constructor(
    @InjectRepository(CauHinhToolCap3Repository) repo
  ) {
    super(repo);
  }



  getAll(){
    return this.repo.find()
  }
}
