import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DmbophanService } from './dmbophan.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DmbophanEntity } from './dmbophan.entity';

@Crud({
  model: {
    type: DmbophanEntity,
  }
})
@Controller('dmbophan')
@ApiTags('dmbophan')
export class DmbophanController implements CrudController<DmbophanEntity> {
  constructor(
    public service: DmbophanService
  ) {

  }

}
