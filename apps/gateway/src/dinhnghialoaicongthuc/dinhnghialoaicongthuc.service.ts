import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';

import { DinhNghiaLoaiCongThucRepository } from './dinhnghialoaicongthuc.repository';
import { DinhNghiaLoaiCongThucEntity } from './dinhnghialoaicongthuc.entity';

@Injectable()
export class DinhNghiaLoaiCongThucService extends TypeOrmCrudService<DinhNghiaLoaiCongThucEntity> {
  constructor(
    @InjectRepository(DinhNghiaLoaiCongThucRepository) repo
  ) {
    super(repo);
  }
}
