import { EntityRepository, Repository } from 'typeorm';
import { moduleEntity } from './cauhinhthoigianchophepdatlich.entity';


@EntityRepository(moduleEntity)
export class ThoiGianChoPhepDatLichRepository extends Repository<moduleEntity> {}
