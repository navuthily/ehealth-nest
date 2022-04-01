import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DonThuocService } from './donthuoc.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DonthuocEntity } from './donthuoc.entity';

@Crud({
  model: {
    type: DonthuocEntity,
  },

  query: {
    join: {
      donthuocchitiets: {
        eager: false,
      }, 
      'donthuocchitiets.dmthuoc':{
        eager: false
      }
    },
  }
})


@Controller('donthuoc')
@ApiTags('donthuoc')
export class DonThuocController implements CrudController<DonthuocEntity> {
  constructor(
    public service: DonThuocService
  ) {

  }

}

//http://localhost:7000/donthuoc?join=donthuocchitiets&join=donthuocchitiets.dmthuoc&filter=donthuocchitiets.id_donthuoc||$eq||3592668

