import { AuthGuard } from '@libs/guards/auth.guard';
import { Body, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Type } from 'ts-morph';
import { UserLoginDto } from '../auth/dto/UserLoginDto';
import { GetCurrentUserById } from '../getUser/getbyuser';
import { checkBodyRequestInterceptor } from '../middleware/checkBodyRequest.interceptor';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { moduleEntity } from './cauhinhthoigianchophepdatlich.entity';
import { ThoiGianDatLichService } from './cauhinhthoigianchophepdatlich.service';
import { updateThoigianDatLichDto } from './dto/updatethoigiandatlich.dto';

@Crud({
  model: {
    type: moduleEntity,
  },
  dto: {
    update: updateThoigianDatLichDto,
  },
})
// @UseGuards(AuthGuard())
// @ApiBearerAuth()
// @UseInterceptors(checkBodyRequestInterceptor)
@Controller('thoigiandatlich')
@ApiTags('thoigiandatlich')
export class ThoiGianDatLichController implements CrudController<moduleEntity> {
  constructor(
    public service: ThoiGianDatLichService,
    public readonly userService: UserService,
  ) {}
  get base(): CrudController<moduleEntity> {
    return this;
  }
  @Override('updateOneBase')
  async coolFunction(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: updateThoigianDatLichDto,
    // @GetCurrentUserById() users
  ) {
    console.log(dto);

    // const idUpdateBy = users.id;
    // const idCreateBy = users.id
    const idUpdateBy = '242424';
    const idCreateBy = '242424';

    dto.nguoisua = idUpdateBy;
    dto.nguoitao = idCreateBy;
    if (this.base.updateOneBase) return this.base.updateOneBase(req, dto);
  }
}
