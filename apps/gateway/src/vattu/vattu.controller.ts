import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { VatTu } from './vattu.entity';
import { VattuService } from './vattu.service';

@Crud({
  model: {
    type: VatTu,
  },
  params: {
    Ma_vt: {
      field: 'Ma_vt',
      type: 'string',
      primary: true,
      disabled: false,
    },
  },
})
@ApiTags('vattu')
@Controller('vattu')
export class VattuController implements CrudController<VatTu> {
  constructor(public service: VattuService) {}

  // @Patch("/update/:mavt")
  // updateVT(@Param('mavt') mavt: string, @Body() obj){
  //   return this.service.updateVT(mavt, obj)
  // }
}
