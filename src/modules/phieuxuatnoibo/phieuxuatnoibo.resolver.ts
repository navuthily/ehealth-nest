import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';

import { PhieuXuatNoiBoDTO } from './dto/phieuxuatnoibo.dto';
import { PhieuXuatNoiBoService } from './phieuxuatnoibo.service';

@Resolver(() => PhieuXuatNoiBoDTO)
export class PhieuXuatNoiBoResolver {
  constructor(private phieuxuatnoiboService: PhieuXuatNoiBoService) {}

  @Mutation((returns) => PhieuXuatNoiBoDTO)
  @UseGuards(JwtAuthGuard)
  async updateChotPhieu(@Args('id') id: number): Promise<PhieuXuatNoiBoDTO> {
    return this.phieuxuatnoiboService.updateChotPhieu(id);
  }
}
