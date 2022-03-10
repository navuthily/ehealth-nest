import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DmtinhthanhphoEntity } from './dmtinhthanhpho.entity';


@EntityRepository(DmtinhthanhphoEntity)
export class DmtinhthanhphoRepository extends Repository<DmtinhthanhphoEntity> {}
