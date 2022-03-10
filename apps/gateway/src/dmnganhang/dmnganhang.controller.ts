import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DmnganhangService } from './dmnganhang.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DmnganhangEntity } from './dmnganhang.entity';

@Crud({
  model: {
    type: DmnganhangEntity,
  }
})
@Controller('dmnganhang')
@ApiTags('dmnganhang')
export class DmnganhangController implements CrudController<DmnganhangEntity> {
  constructor(
    public service: DmnganhangService
  ) {

  }

}
