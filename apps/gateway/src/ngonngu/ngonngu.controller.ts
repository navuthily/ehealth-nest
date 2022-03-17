import { Controller, Get, Header, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DMlanguageService } from './ngonngu.service';




@Controller('dmlanguage')
@ApiTags('dmlanguage')
export class DmlanguageController {
  constructor(
    public service: DMlanguageService
  ) {

  }

  @Get('')
  async getAll() {
    return this.service.getAll();

  }


}
