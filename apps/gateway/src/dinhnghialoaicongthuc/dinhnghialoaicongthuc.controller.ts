import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { DinhNghiaLoaiCongThucService } from './dinhnghialoaicongthuc.service';
import { DinhNghiaLoaiCongThucEntity } from './dinhnghialoaicongthuc.entity';

@Crud({
  model: {
    type: DinhNghiaLoaiCongThucEntity,
  },
  query: {
    join: {
      lichsuchamdiemcap1s: {
        eager: true
      },

    }
  }
})
@Controller('dinhnghialoaicongthuc')
@ApiTags('dinhnghialoaicongthuc')
export class DinhNghiaLoaiCongThucController implements CrudController<DinhNghiaLoaiCongThucEntity> {
  constructor(
    public service: DinhNghiaLoaiCongThucService
  ) {

  }

}
