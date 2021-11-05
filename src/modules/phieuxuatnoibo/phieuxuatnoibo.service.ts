import { Inject, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PhieuXuatNoiBoEntity } from './phieuxuatnoibo.entity';
import { PhieuXuatNoiBoDTO } from './dto/phieuxuatnoibo.dto';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

@QueryService(PhieuXuatNoiBoEntity)
export class PhieuXuatNoiBoService extends TypeOrmQueryService<PhieuXuatNoiBoEntity> {
  constructor(
    @InjectRepository(PhieuXuatNoiBoEntity)
    private phieuxuatnoiboRepository: Repository<PhieuXuatNoiBoEntity>,
    @Inject(REQUEST) private ctx: any,
  ) {
    super(phieuxuatnoiboRepository, { useSoftDelete: true });
  }

  async updateChotPhieu(phieuxuatnoiboId: number): Promise<PhieuXuatNoiBoDTO> {
    const phieuxuatnoibo = await this.phieuxuatnoiboRepository.findOne({
      phieuxuatnoiboId,
    });
    if (!phieuxuatnoibo) {
      throw new NotFoundException(
        `PhieuXuatNoiBo with ID_PhieuXuatNoiBo "${phieuxuatnoiboId}" not found`,
      );
    }
    phieuxuatnoibo.nguoichot = this.ctx.req.user.id;
    phieuxuatnoibo.ngaychot = new Date();
    return this.phieuxuatnoiboRepository.save(phieuxuatnoibo);
  }
}
