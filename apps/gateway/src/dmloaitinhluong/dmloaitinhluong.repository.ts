import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DmloaitinhluongEntity } from './dmloaitinhluong.entity';


@EntityRepository(DmloaitinhluongEntity)
export class DmloaitinhluongRepository extends Repository<DmloaitinhluongEntity> {}
