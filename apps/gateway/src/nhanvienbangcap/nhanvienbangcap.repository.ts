import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { NhanvienbangcapEntity } from './nhanvienbangcap.entity';


@EntityRepository(NhanvienbangcapEntity)
export class NhanvienbangcapRepository extends Repository<NhanvienbangcapEntity> {}
