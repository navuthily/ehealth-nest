import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { LichSuChamDiemCap2Entity } from './lichsuchamdiemcap2.entity';
import { LichSuChamDiemCap2Repository } from './lichsuchamdiemcap2.repository';
import { getRepository } from 'typeorm';
import { LichSuChamDiemCap1Service } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.service';
import { Cap2DTO } from './dto/cap2DTO';


@Injectable()
export class LichSuChamDiemCap2Service extends TypeOrmCrudService<LichSuChamDiemCap2Entity> {
  constructor(
    @InjectRepository(LichSuChamDiemCap2Repository) repo,
    
  ) {
    super(repo);
  }



}
