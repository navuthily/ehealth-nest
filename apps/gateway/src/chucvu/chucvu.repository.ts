import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ChucvuEntity } from './chucvu.entity';


@EntityRepository(ChucvuEntity)
export class ChucvuRepository extends Repository<ChucvuEntity> {}
