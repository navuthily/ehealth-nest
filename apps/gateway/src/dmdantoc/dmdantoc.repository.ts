import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DmdantocEntity } from './dmdantoc.entity';


@EntityRepository(DmdantocEntity)
export class DmdantocRepository extends Repository<DmdantocEntity> {}
