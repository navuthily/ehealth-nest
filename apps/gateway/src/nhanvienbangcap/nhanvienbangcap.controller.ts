import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { NhanvienbangcapService } from './nhanvienbangcap.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { NhanvienbangcapEntity } from './nhanvienbangcap.entity';

@Crud({
  model: {
    type: NhanvienbangcapEntity,
  },
  query:{
    join:{
      loaibangcap:{eager:true}
    }
  }

})
@Controller('nhanvienbangcap')
@ApiTags('nhanvienbangcap')
export class NhanvienbangcapController implements CrudController<NhanvienbangcapEntity> {
  constructor(
    public service: NhanvienbangcapService
  ) {

  }
}
