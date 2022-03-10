import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ThoihanhopdongEntity } from './thoihanhopdong.entity';


@EntityRepository(ThoihanhopdongEntity)
export class ThoihanhopdongRepository extends Repository<ThoihanhopdongEntity> {}
