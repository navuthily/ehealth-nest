import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DmquoctichEntity } from './dmquoctich.entity';


@EntityRepository(DmquoctichEntity)
export class DmquoctichRepository extends Repository<DmquoctichEntity> {}
