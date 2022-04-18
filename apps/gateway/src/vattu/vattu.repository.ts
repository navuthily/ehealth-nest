import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { VatTu } from './vattu.entity';

@EntityRepository(VatTu)
export class VattuRepository extends Repository<VatTu> {}
