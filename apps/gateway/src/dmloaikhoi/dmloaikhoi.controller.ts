import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DmloaikhoiService } from './dmloaikhoi.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DmloaikhoiEntity } from './dmloaikhoi.entity';

@Crud({
  model: {
    type: DmloaikhoiEntity,
  }
})
@Controller('dmloaikhoi')
@ApiTags('dmloaikhoi')
export class DmloaikhoiController implements CrudController<DmloaikhoiEntity> {
  constructor(
    public service: DmloaikhoiService
  ) {

  }

}
