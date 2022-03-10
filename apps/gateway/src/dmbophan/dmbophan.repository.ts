import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DmbophanEntity } from './dmbophan.entity';


@EntityRepository(DmbophanEntity)
export class DmbophanRepository extends Repository<DmbophanEntity> {}
