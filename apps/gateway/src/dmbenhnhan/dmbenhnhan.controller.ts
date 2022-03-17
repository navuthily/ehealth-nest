import { Controller, Get, Header, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DMbenhnhanService } from './dmbenhnhan.service';




@Controller('dmbenhnhan')
@ApiTags('dmbenhnhan')
export class DmbenhnhanController {
  constructor(
    public service: DMbenhnhanService
  ) {

  }
  // lấy suất ăn theo id_phieu
  @Get('/avatar/:id_benhnhan')
  @Header('Content-Type', 'image/png')
  async getByIdPhieu(@Param('id_benhnhan') id_benhnhan, @Res() res) {
    const data = await this.service.getAvatar(id_benhnhan)
    res.send(data)
  }

  // @Get('/:id_benhnhan')
  // async getByIdPhieu(@Param('id_benhnhan')  id_benhnhan, @Res() res) {  
  //   const data = await this.service.getAvatar(id_benhnhan)
  //   // const a = "123"
  //   // const file = createReadStream(data)
  //   // file.pipe(data)
  //   return this.service.getAvatar(id_benhnhan)
  // }

}
