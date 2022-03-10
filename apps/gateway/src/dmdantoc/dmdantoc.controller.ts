import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DmdantocService } from './dmdantoc.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DmdantocEntity } from './dmdantoc.entity';

@Crud({
  model: {
    type: DmdantocEntity,
  }
})
@Controller('dmdantoc')
@ApiTags('dmdantoc')
export class DmdantocController implements CrudController<DmdantocEntity> {
  constructor(
    public service: DmdantocService
  ) {

  }

}
