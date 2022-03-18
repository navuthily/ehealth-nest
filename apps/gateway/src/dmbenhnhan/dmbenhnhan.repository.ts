import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DMbenhnhanEntity } from './dmbenhnhan.entity';




@EntityRepository(DMbenhnhanEntity)
export class DMbenhnhanRepository extends Repository<DMbenhnhanEntity> {}
