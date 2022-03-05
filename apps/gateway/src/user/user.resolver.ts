import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { UserDto } from './dto/user-dto';
import { UserService } from './user.service';

@Resolver(() => UserDto)
export class PhieuXuatNoiBoResolver {
  constructor(private phieuxuatnoiboService: UserService) {}

  @Mutation((returns) => UserDto)
  // @UseGuards(JwtAuthGuard)
  async login(@Args('id') id: number): Promise<void> {
    
    // return this.phieuxuatnoiboService.updateChotPhieu(id);
  }
}
