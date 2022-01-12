import { Module } from '@nestjs/common';
import { DMReportController } from './dm_report.controller';
import { DMReportService } from './dm_report.service';

@Module({
  imports: [],
  controllers: [DMReportController],
  providers: [DMReportService],
})
export class DMReportModule {}
