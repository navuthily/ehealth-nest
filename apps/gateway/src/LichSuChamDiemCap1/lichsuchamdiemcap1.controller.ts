import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { LichSuChamDiemCap1Service } from './lichsuchamdiemcap1.service';
import { LichSuChamDiemCap1 } from './lichsuchamdiemcap1.entity';


@Crud({
  model: {
    type: LichSuChamDiemCap1,
  },
  query: {
    join: {
      dinhnghialoaicongthuc: {
        eager: true
      },
      nhanvien: {
        eager: true
      },
      // cauhinhtoolcap1: {
      //   eager: true
      // },
      lichsuchamdiemcap2s: {
        eager: true
      }
    }
  }
})
@Controller('lichsuchamdiemcap1')
@ApiTags('lichsuchamdiemcap1')
export class DmdantocController implements CrudController<LichSuChamDiemCap1> {
  constructor(
    public service: LichSuChamDiemCap1Service
  ) {

  }

}
