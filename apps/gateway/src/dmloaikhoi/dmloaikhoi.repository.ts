import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DmloaikhoiEntity } from './dmloaikhoi.entity';


@EntityRepository(DmloaikhoiEntity)
export class DmloaikhoiRepository extends Repository<DmloaikhoiEntity> {}
