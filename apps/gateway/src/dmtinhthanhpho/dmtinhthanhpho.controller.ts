import {
  Controller
} from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { DmtinhthanhphoService } from './dmtinhthanhpho.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { DmtinhthanhphoEntity } from './dmtinhthanhpho.entity';

@Crud({
  model: {
    type: DmtinhthanhphoEntity,
  }
})
@Controller('dmtinhthanhpho')
@ApiTags('dmtinhthanhpho')
export class DmtinhthanhphoController implements CrudController<DmtinhthanhphoEntity> {
  constructor(
    public service: DmtinhthanhphoService
  ) {
  }
}
