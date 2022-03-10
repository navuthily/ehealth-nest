import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { LoaibangcapEntity } from './loaibangcap.entity';


@EntityRepository(LoaibangcapEntity)
export class LoaibangcapRepository extends Repository<LoaibangcapEntity> {}
