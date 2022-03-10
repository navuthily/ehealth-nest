import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DmloaitinhluongService } from './dmloaitinhluong.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DmloaitinhluongEntity } from './dmloaitinhluong.entity';

@Crud({
  model: {
    type: DmloaitinhluongEntity,
  }
})
@Controller('dmloaitinhluong')
@ApiTags('dmloaitinhluong')
export class DmloaitinhluongController implements CrudController<DmloaitinhluongEntity> {
  constructor(
    public service: DmloaitinhluongService
  ) {

  }
}
