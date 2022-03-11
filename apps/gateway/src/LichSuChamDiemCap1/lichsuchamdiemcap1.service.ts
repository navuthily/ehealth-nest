import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { LichSuChamDiemCap1 } from './lichsuchamdiemcap1.entity';
import { LichSuChamDiemCap1Repository } from './lichsuchamdiemcap1.repository';


@Injectable()
export class LichSuChamDiemCap1Service extends TypeOrmCrudService<LichSuChamDiemCap1> {
  constructor(
    @InjectRepository(LichSuChamDiemCap1Repository) repo
  ) {
    super(repo);
  }
}
