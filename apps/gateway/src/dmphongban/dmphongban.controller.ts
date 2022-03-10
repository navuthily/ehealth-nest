import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DmphongbanService } from './dmphongban.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DmphongbanEntity } from './dmphongban.entity';

@Crud({
  model: {
    type: DmphongbanEntity,
  }
})
@Controller('dmphongban')
@ApiTags('dmphongban')
export class DmphongbanController implements CrudController<DmphongbanEntity> {
  constructor(
    public service: DmphongbanService
  ) {

  }

}
