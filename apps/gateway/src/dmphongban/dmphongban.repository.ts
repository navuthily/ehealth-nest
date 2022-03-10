import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DmphongbanEntity } from './dmphongban.entity';


@EntityRepository(DmphongbanEntity)
export class DmphongbanRepository extends Repository<DmphongbanEntity> {}
