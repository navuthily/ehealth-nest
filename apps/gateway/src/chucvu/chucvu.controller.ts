import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { ChucvuService } from './chucvu.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { ChucvuEntity } from './chucvu.entity';

@Crud({
  model: {
    type: ChucvuEntity,
  }
})
@Controller('chucvu')
@ApiTags('chucvu')
export class ChucvuController implements CrudController<ChucvuEntity> {
  constructor(
    public service: ChucvuService
  ) {

  }

}
