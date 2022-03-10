import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DiemthianhvanEntity } from './diemthianhvan.entity';


@EntityRepository(DiemthianhvanEntity)
export class DiemthianhvanRepository extends Repository<DiemthianhvanEntity> {}
