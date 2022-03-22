import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { CauHinhToolCap1Entity } from './cauhinhtoolcap1.entity';




@EntityRepository(CauHinhToolCap1Entity)
export class CauHinhToolCap1Repository extends Repository<CauHinhToolCap1Entity> {}
