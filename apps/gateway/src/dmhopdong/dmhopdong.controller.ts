import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DmhopdongService } from './dmhopdong.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DmhopdongEntity } from './dmhopdong.entity';

@Crud({
  model: {
    type: DmhopdongEntity,
  }
})
@Controller('dmhopdong')
@ApiTags('dmhopdong')
export class DmhopdongController implements CrudController<DmhopdongEntity> {
  constructor(
    public service: DmhopdongService
  ) {

  }

}
