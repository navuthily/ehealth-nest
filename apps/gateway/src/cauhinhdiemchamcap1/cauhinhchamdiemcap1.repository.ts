import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { CauHinhDiemChamCap1Entity } from './cauhinhdiemchamcap1.entity';




@EntityRepository(CauHinhDiemChamCap1Entity)
export class  CauHinhDiemChamCap1Repository extends Repository<CauHinhDiemChamCap1Entity> {}
