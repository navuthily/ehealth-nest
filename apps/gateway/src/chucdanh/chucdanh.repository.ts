import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ChucdanhEntity } from './chucdanh.entity';


@EntityRepository(ChucdanhEntity)
export class ChucdanhRepository extends Repository<ChucdanhEntity> {}
