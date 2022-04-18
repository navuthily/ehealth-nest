import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { NhomvattuEntity } from './nhomvattu.entity';
import { NhomvattuRepository } from './nhomvattu.repository';

@Injectable()
export class NhomvattuService extends TypeOrmCrudService<NhomvattuEntity> {
  constructor(@InjectRepository(NhomvattuRepository, 'SV_FAMILY_') repo) {
    super(repo);
  }
}
