import { Inject, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DMBenhNhanEntity } from './dm-benhnhan.entity';
import { DMBenhNhanDTO } from './dto/dm-benhnhan.dto';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Mutation, Query } from '@nestjs/graphql';

@QueryService(DMBenhNhanEntity)
export class DMBenhNhanService extends TypeOrmQueryService<DMBenhNhanEntity> {
  constructor(
    @InjectRepository(DMBenhNhanEntity)
    private dmBenhNhanRepository: Repository<DMBenhNhanEntity>,
    @Inject(REQUEST) private ctx: any,
  ) {
    super(dmBenhNhanRepository, { useSoftDelete: true });
  }
}
