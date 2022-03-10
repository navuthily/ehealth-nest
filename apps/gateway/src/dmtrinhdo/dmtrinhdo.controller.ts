import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DmtrinhdoService } from './dmtrinhdo.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DmtrinhdoEntity } from './dmtrinhdo.entity';

@Crud({
  model: {
    type: DmtrinhdoEntity,
  }
})
@Controller('dmtrinhdo')
@ApiTags('dmtrinhdo')
export class DmtrinhdoController implements CrudController<DmtrinhdoEntity> {
  constructor(
    public service: DmtrinhdoService
  ) {

  }

}
