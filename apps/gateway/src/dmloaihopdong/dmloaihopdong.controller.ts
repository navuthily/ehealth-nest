import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DmloaihopdongService } from './dmloaihopdong.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DmloaihopdongEntity } from './dmloaihopdong.entity';

@Crud({
  model: {
    type: DmloaihopdongEntity,
  }
})
@Controller('dmloaihopdong')
@ApiTags('dmloaihopdong')
export class DmloaihopdongController implements CrudController<DmloaihopdongEntity> {
  constructor(
    public service: DmloaihopdongService
  ) {

  }

}
