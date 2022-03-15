import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DmnganhangEntity } from './dmnganhang.entity';


@EntityRepository(DmnganhangEntity)
export class DmnganhangRepository extends Repository<DmnganhangEntity> {}
