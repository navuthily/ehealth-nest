import { Inject, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PhieuXuatNoiBoEntity } from './phieuxuatnoibo.entity';
import { PhieuXuatNoiBoDTO } from './dto/phieuxuatnoibo.dto';

export class PhieuXuatNoiBoService {
  constructor(
    @InjectRepository(PhieuXuatNoiBoEntity)
    private phieuxuatnoiboRepository: Repository<PhieuXuatNoiBoEntity>,
    @Inject(REQUEST) private ctx: any,
  ) {}

  async updateChotPhieu(id: number): Promise<PhieuXuatNoiBoDTO> {
    const phieuxuatnoibo = await this.phieuxuatnoiboRepository.findOne({
      id,
    });

    // console.log(this.ctx.req.user);
    if (!phieuxuatnoibo) {
      throw new NotFoundException(
        `PhieuXuatNoiBo with ID_PhieuXuatNoiBo "${id}" not found`,
      );
    }

    phieuxuatnoibo.nguoichot = this.ctx.req.user.id;
    phieuxuatnoibo.ngaychot = new Date();

    return this.phieuxuatnoiboRepository.save(phieuxuatnoibo);
  }
}
