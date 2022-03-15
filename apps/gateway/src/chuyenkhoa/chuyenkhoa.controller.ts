import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { ChuyenkhoaService } from './chuyenkhoa.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { ChuyenkhoaEntity } from './chuyenkhoa.entity';

@Crud({
  model: {
    type: ChuyenkhoaEntity,
  }
})
@Controller('chuyenkhoa')
@ApiTags('chuyenkhoa')
export class ChuyenkhoaController implements CrudController<ChuyenkhoaEntity> {
  constructor(
    public service: ChuyenkhoaService
  ) {

  }

}
