import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { NhomvattuEntity } from './nhomvattu.entity';

@EntityRepository(NhomvattuEntity)
export class NhomvattuRepository extends Repository<NhomvattuEntity> {}
