import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { ChucdanhService } from './chucdanh.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { ChucdanhEntity } from './chucdanh.entity';

@Crud({
  model: {
    type: ChucdanhEntity,
  },  
  query: {
    join: {
      nhanviens: {
            eager: true
        }
    }
  }
})
@Controller('chucdanh')
@ApiTags('chucdanh')
export class ChucdanhController implements CrudController<ChucdanhEntity> {
  constructor(
    public service: ChucdanhService
  ) {

  }

}
