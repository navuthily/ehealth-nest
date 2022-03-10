import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { TinhtranghonnhanService } from './tinhtranghonnhan.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { TinhtranghonnhanEntity } from './tinhtranghonnhan.entity';

@Crud({
  model: {
    type: TinhtranghonnhanEntity,
  }
})
@Controller('tinhtranghonnhan')
@ApiTags('tinhtranghonnhan')
export class TinhtranghonnhanController implements CrudController<TinhtranghonnhanEntity> {
  constructor(
    public service: TinhtranghonnhanService
  ) {

  }

}
