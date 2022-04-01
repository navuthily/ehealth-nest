import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DonthuocEntity } from './donthuoc.entity';




@EntityRepository(DonthuocEntity)
export class DonthuocRepository extends Repository<DonthuocEntity> {}
