import { Injectable } from '@nestjs/common';
import { TemplateHdRepository } from './templatehd.repository';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateHdEntity } from './templatehd.entity';

@Injectable()
export class TemplateHdService extends TypeOrmCrudService<TemplateHdEntity> {
  constructor(
    @InjectRepository(TemplateHdRepository) repo
  ) {
    super(repo);
  }
}
