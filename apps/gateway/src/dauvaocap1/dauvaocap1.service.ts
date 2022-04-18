import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DauVaoCap1Entity } from './dauvaocap1.entity';
import { DauVaoCap1Repository } from './dauvaocap1.repository';


@Injectable()
export class DauVaoCap1Service extends TypeOrmCrudService<DauVaoCap1Entity> {
  constructor(
    @InjectRepository(DauVaoCap1Repository) repo
  ) {
    super(repo);
  }



  getAll(){
    return this.repo.find()
  }
}
