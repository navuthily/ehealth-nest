import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { PhamvichungchihanhngheService } from './phamvichungchihanhnghe.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { PhamvichungchihanhngheEntity } from './phamvichungchihanhnghe.entity';

@Crud({
  model: {
    type: PhamvichungchihanhngheEntity,
  }
})
@Controller('phamvichungchihanhnghe')
@ApiTags('phamvichungchihanhnghe')
export class PhamvichungchihanhngheController implements CrudController<PhamvichungchihanhngheEntity> {
  constructor(
    public service: PhamvichungchihanhngheService
  ) {

  }

}
