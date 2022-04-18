import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { NhomvattuService } from './nhomvattu.service';
import { NhomvattuEntity } from './nhomvattu.entity';
import { nhomvattudto } from './dto/nhomvattu.dto';

@Crud({
  model: {
    type: NhomvattuEntity,
  },
  dto: {
    create: nhomvattudto,
    update: nhomvattudto,
  },
})
@ApiTags('nhomvattu')
@Controller('nhomvattu')
export class NhomvattuController implements CrudController<NhomvattuEntity> {
  constructor(public service: NhomvattuService) {}
}
