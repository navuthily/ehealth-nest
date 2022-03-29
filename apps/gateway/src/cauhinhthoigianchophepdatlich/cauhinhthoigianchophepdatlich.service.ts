import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { moduleEntity } from './cauhinhthoigianchophepdatlich.entity';
import { ThoiGianChoPhepDatLichRepository } from './cauhinhthoigianchophepdatlich.repository';

@Injectable()
export class ThoiGianDatLichService extends TypeOrmCrudService<moduleEntity> {
  constructor(
    @InjectRepository(ThoiGianChoPhepDatLichRepository, 'SV_THANHVIEN_') repo,
  ) {
    super(repo);
  }

}
