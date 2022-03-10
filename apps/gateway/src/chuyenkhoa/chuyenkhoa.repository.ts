import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ChuyenkhoaEntity } from './chuyenkhoa.entity';


@EntityRepository(ChuyenkhoaEntity)
export class ChuyenkhoaRepository extends Repository<ChuyenkhoaEntity> {}
