import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { DinhNghiaLoaiCongThucEntity } from './dinhnghialoaicongthuc.entity';


@EntityRepository(DinhNghiaLoaiCongThucEntity)
export class DinhNghiaLoaiCongThucRepository extends Repository<DinhNghiaLoaiCongThucEntity> {}
