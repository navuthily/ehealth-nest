import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DauVaoCap1Entity } from './dauvaocap1.entity';




@EntityRepository(DauVaoCap1Entity)
export class DauVaoCap1Repository extends Repository<DauVaoCap1Entity> {}
