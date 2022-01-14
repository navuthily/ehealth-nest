import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LanguageThongtinbenhvienService } from './language-thongtinbenhvien.service';

@ApiTags('language-thongtinbenhvien')
@Controller('language-thongtinbenhvien')
export class LanguageThongtinbenhvienController {
  constructor(
    private languagethongtinbenhvienService: LanguageThongtinbenhvienService,
  ) {}

  @Post()
  async index(@Body() data: any) {
    const { id, keyname, code } = data;
    const result =
      await this.languagethongtinbenhvienService.exec_multi_language_infomation_hospital(
        id,
        keyname,
        code,
      );
    return result;
  }
}
