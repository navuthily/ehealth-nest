import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { LichSuChamDiemCap2Entity } from './lichsuchamdiemcap2.entity';
import { LichSuChamDiemCap2Repository } from './lichsuchamdiemcap2.repository';


@Injectable()
export class LichSuChamDiemCap2Service extends TypeOrmCrudService<LichSuChamDiemCap2Entity> {
  constructor(
    @InjectRepository(LichSuChamDiemCap2Repository) repo
  ) {
    super(repo);
  }
}
