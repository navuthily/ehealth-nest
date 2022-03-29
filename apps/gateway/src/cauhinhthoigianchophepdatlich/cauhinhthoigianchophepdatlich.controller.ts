import { AuthGuard } from '@libs/guards/auth.guard';
import {
  Body,
  Controller, Get, UseGuards
} from '@nestjs/common';
import {  ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { UserLoginDto } from '../auth/dto/UserLoginDto';
import { GetCurrentUserById } from '../getUser/getbyuser';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { moduleEntity } from './cauhinhthoigianchophepdatlich.entity';
import { ThoiGianDatLichService } from './cauhinhthoigianchophepdatlich.service';

@Crud({
  model: {
    type: moduleEntity,
  },
})

// @UseGuards(AuthGuard())
// @ApiBearerAuth()
@Controller('thoigiandatlich')
@ApiTags('thoigiandatlich')
export class ThoiGianDatLichController implements CrudController<moduleEntity> {
  constructor(
    public service: ThoiGianDatLichService,
    public readonly userService: UserService,
  ) {

  }
  get base(): CrudController<moduleEntity> {
    return this;
  }
  @Override('updateOneBase')
  async coolFunction(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: moduleEntity,
    // @GetCurrentUserById() users
  ) {
    // const id = users.id;
    const id = "242424";

    dto.nguoisua = id 
    if(this.base.updateOneBase)
    return this.base.updateOneBase(req, dto);
  }


  
}
