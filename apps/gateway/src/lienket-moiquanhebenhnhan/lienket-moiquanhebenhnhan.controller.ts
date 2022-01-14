import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LienKetMoiQuanHeBenhNhanService } from './lienket-moiquanhebenhnhan.service';

@ApiTags('lienket-moiquanhebenhnhan')
@Controller('lienket-moiquanhebenhnhan')
export class LienKetMoiQuanHeBenhNhanController {
  constructor(
    private lienketmoiquanhebenhnhanService: LienKetMoiQuanHeBenhNhanService,
  ) {}

  @Post()
  async index(@Body() data: any) {
    const { id } = data;
    const [ID_LoaiQuanHe,gioitinh] =  await Promise.all([
      this.lienketmoiquanhebenhnhanService.exec_getidloaiquanhe_moiquanhebenhnhan(
        id,
      ),
      this.lienketmoiquanhebenhnhanService.exec_getgioitinh_moiquanhebenhnhan(
        id,
      ),
    ]);
    const [ID_MoiQuanHe_ConLai] =
      await this.lienketmoiquanhebenhnhanService.exec_lienket_moiquanhebenhnhan(
        ID_LoaiQuanHe[0].ID_LoaiQuanHe,gioitinh[0].gioitinh
      );
     return ID_MoiQuanHe_ConLai;
  }
}
