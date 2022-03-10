import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { TinhtranghonnhanEntity } from './tinhtranghonnhan.entity';


@EntityRepository(TinhtranghonnhanEntity)
export class TinhtranghonnhanRepository extends Repository<TinhtranghonnhanEntity> {}
