import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DmdonviService } from './dmdonvi.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DmdonviEntity } from './dmdonvi.entity';

@Crud({
  model: {
    type: DmdonviEntity,
  }
})
@Controller('dmdonvi')
@ApiTags('dmdonvi')
export class DmdonviController implements CrudController<DmdonviEntity> {
  constructor(
    public service: DmdonviService
  ) {

  }

}
