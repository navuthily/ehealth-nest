import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DonthuoctralaiService } from './donthuoctralai.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DonthuoctralaiEntity } from './donthuoctralai.entity';

@Crud({
  model: {
    type: DonthuoctralaiEntity,
  },

  query: {
    join: {
      donthuoctralaichitiets: {
        eager: false,
      }, 
      'donthuoctralaichitiets.dmthuoc':{
        eager: false
      }

    },
  }
})


@Controller('donthuoctralai')
@ApiTags('donthuoctralai')
export class DonthuoctralaiController implements CrudController<DonthuoctralaiEntity> {
  constructor(
    public service: DonthuoctralaiService
  ) {

  }

}

//http://localhost:7000/donthuoc?join=donthuocchitiets&join=donthuocchitiets.dmthuoc&filter=donthuocchitiets.id_donthuoc||$eq||3592668

