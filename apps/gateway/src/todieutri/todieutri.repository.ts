import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ToDieuTriEntity } from './todieutri.entity';





@EntityRepository(ToDieuTriEntity)
export class ToDieuTriRepository extends Repository<ToDieuTriEntity> {}
