import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { DonthuocchitietEntity } from './donthuocchitiet.entity';
import { DonthuocchitietService } from './donthuocchitiet.service';

@Crud({
  model: {
    type: DonthuocchitietEntity,
  },



})


@Controller('donthuocchitiet')
@ApiTags('donthuocchitiet')
export class DonthuocchitietController implements CrudController<DonthuocchitietEntity> {
  constructor(
    public service: DonthuocchitietService
  ) {

  }

}
