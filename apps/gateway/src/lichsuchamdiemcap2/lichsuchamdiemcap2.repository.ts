import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { LichSuChamDiemCap2Entity } from './lichsuchamdiemcap2.entity';


@EntityRepository(LichSuChamDiemCap2Entity)
export class LichSuChamDiemCap2Repository extends Repository<LichSuChamDiemCap2Entity> {}
