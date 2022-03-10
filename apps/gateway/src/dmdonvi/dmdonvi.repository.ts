import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DmdonviEntity } from './dmdonvi.entity';


@EntityRepository(DmdonviEntity)
export class DmdonviRepository extends Repository<DmdonviEntity> {}
