import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DmhopdongEntity } from './dmhopdong.entity';


@EntityRepository(DmhopdongEntity)
export class DmhopdongRepository extends Repository<DmhopdongEntity> {}
