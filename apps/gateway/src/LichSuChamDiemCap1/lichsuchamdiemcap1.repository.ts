import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { LichSuChamDiemCap1 } from './lichsuchamdiemcap1.entity';



@EntityRepository(LichSuChamDiemCap1)
export class LichSuChamDiemCap1Repository extends Repository<LichSuChamDiemCap1> {}
