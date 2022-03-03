import { Module } from '@nestjs/common';
import { ThucDonController } from './thucdon.controller';
import { ThucDonService } from './thucdon.service';

@Module({
  imports: [],
  controllers: [ThucDonController],
  providers: [ThucDonService],
})
export class ThucDonModule {}
