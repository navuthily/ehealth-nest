import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { NhanvienhopdongEntity } from './nhanvienhopdong.entity';


@EntityRepository(NhanvienhopdongEntity)
export class NhanvienhopdongRepository extends Repository<NhanvienhopdongEntity> {}
