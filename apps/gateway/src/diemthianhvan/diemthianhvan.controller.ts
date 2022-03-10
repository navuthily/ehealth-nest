import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DiemthianhvanService } from './diemthianhvan.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DiemthianhvanEntity } from './diemthianhvan.entity';

@Crud({
  model: {
    type: DiemthianhvanEntity,
  },

})
@Controller('diemthianhvan')
@ApiTags('diemthianhvan')
export class DiemthianhvanController implements CrudController<DiemthianhvanEntity> {
  constructor(
    public service: DiemthianhvanService
  ) {

  }
}
