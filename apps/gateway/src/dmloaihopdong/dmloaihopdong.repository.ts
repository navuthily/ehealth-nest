import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DmloaihopdongEntity } from './dmloaihopdong.entity';


@EntityRepository(DmloaihopdongEntity)
export class DmloaihopdongRepository extends Repository<DmloaihopdongEntity> {}
