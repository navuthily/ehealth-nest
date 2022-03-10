import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { NhanvienhopdongService } from './nhanvienhopdong.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { NhanvienhopdongEntity } from './nhanvienhopdong.entity';

@Crud({
  model: {
    type: NhanvienhopdongEntity,
  },
  query:{
    join:{
      loaihopdong:{eager:true}
    }
  }

})
@Controller('nhanvienhopdong')
@ApiTags('nhanvienhopdong')
export class NhanvienhopdongController implements CrudController<NhanvienhopdongEntity> {
  constructor(
    public service: NhanvienhopdongService
  ) {

  }
}
