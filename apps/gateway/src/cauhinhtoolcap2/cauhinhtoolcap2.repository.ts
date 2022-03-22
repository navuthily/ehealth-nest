import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { CauHinhToolCap2Entity } from './cauhinhtoolcap2.entity';




@EntityRepository(CauHinhToolCap2Entity)
export class CauHinhToolCap2Repository extends Repository<CauHinhToolCap2Entity> {}
