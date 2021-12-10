import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LienKetMoiQuanHeBenhNhanController } from './lienket-moiquanhebenhnhan.controller';
import { LienKetMoiQuanHeBenhNhanService } from './lienket-moiquanhebenhnhan.service';

// @Module({
//   providers: [XmlBHYTService],
// })
@Module({
  imports: [
    HttpModule,
  ],
    controllers: [LienKetMoiQuanHeBenhNhanController],
  providers: [LienKetMoiQuanHeBenhNhanService],
})
export class LienKetMoiQuanHeBenhNhanModule {}
