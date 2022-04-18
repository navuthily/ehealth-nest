import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DonthuocchitietEntity } from './donthuocchitiet.entity';




@EntityRepository(DonthuocchitietEntity)
export class DonthuocchitietRepository extends Repository<DonthuocchitietEntity> {}
