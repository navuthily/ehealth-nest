import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { LichSuChamDiemCap2Service } from './lichsuchamdiemcap2.service';
import { LichSuChamDiemCap2Entity } from './lichsuchamdiemcap2.entity';


@Crud({
  model: {
    type: LichSuChamDiemCap2Entity,
  },
  query: {
    limit:50,

    join: {
      cauhinhtoolcap3: {
        eager: false
      },
      "cauhinhtoolcap3.cauhinhtoolcap2":{
        eager: false
      },
      lichsuchamdiemcap1:{
        eager: false
      }
    }
  }
})
@Controller('lichsuchamdiemcap2')
@ApiTags('lichsuchamdiemcap2')
export class LichSuChamDiemCap2Controller implements CrudController<LichSuChamDiemCap2Entity> {
  constructor(
    public service: LichSuChamDiemCap2Service
  ) {
  }
}
