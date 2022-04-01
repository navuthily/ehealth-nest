import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { DonthuoctralaiEntity } from './donthuoctralai.entity';
import { DonthuoctralaiRepository } from './donthuoctralai.repository';


@Injectable()
export class DonthuoctralaiService extends TypeOrmCrudService<DonthuoctralaiEntity> {
  constructor(
    @InjectRepository(DonthuoctralaiRepository) repo
  ) {
    super(repo);
  }
}
