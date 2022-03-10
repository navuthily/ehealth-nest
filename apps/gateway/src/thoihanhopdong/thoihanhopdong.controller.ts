import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { ThoihanhopdongService } from './thoihanhopdong.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { ThoihanhopdongEntity } from './thoihanhopdong.entity';

@Crud({
  model: {
    type: ThoihanhopdongEntity,
  },  
  query: {
    join: {
      nhanviens: {
            eager: true
        }
    }
  }
})
@Controller('thoihanhopdong')
@ApiTags('thoihanhopdong')
export class ThoihanhopdongController implements CrudController<ThoihanhopdongEntity> {
  constructor(
    public service: ThoihanhopdongService
  ) {

  }

}
