import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { PhamvichungchihanhngheEntity } from './phamvichungchihanhnghe.entity';


@EntityRepository(PhamvichungchihanhngheEntity)
export class PhamvichungchihanhngheRepository extends Repository<PhamvichungchihanhngheEntity> {}
