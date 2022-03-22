import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { CauHinhToolCap3Entity } from './cauhinhtoolcap3.entity';




@EntityRepository(CauHinhToolCap3Entity)
export class CauHinhToolCap3Repository extends Repository<CauHinhToolCap3Entity> {}
