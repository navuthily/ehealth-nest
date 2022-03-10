import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DmtrinhdoEntity } from './dmtrinhdo.entity';


@EntityRepository(DmtrinhdoEntity)
export class DmtrinhdoRepository extends Repository<DmtrinhdoEntity> {}
