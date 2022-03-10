import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DmquoctichService } from './dmquoctich.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DmquoctichEntity } from './dmquoctich.entity';

@Crud({
  model: {
    type: DmquoctichEntity,
  }
})
@Controller('dmquoctich')
@ApiTags('dmquoctich')
export class DmquoctichController implements CrudController<DmquoctichEntity> {
  constructor(
    public service: DmquoctichService
  ) {

  }

}
