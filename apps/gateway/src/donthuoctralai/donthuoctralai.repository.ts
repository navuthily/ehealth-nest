import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DonthuoctralaiEntity } from './donthuoctralai.entity';




@EntityRepository(DonthuoctralaiEntity)
export class DonthuoctralaiRepository extends Repository<DonthuoctralaiEntity> {}
