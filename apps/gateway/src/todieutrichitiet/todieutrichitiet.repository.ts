import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ToDieuTriChiTietEntity } from './todieutrichitiet.entity';





@EntityRepository(ToDieuTriChiTietEntity)
export class ToDieuTriChiTietRepository extends Repository<ToDieuTriChiTietEntity> {}
