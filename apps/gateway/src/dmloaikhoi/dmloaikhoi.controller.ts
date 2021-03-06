import {
  Controller, UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import {  ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { RolesGuard } from '@libs/guards/roles.guard';
import { AuthGuard } from '@libs/guards/auth.guard';
import { Roles } from '@libs/decorators/roles.decorator';
import { RoleType } from '@libs/common/constants/role-type';
import { UpdateInterceptor } from '../interceptor/updated-interceptor';
import { CreateInterceptor } from '../interceptor/created-interceptor';
import { DmloaikhoiService } from './dmloaikhoi.service';
import { DmloaikhoiEntity } from './dmloaikhoi.entity';


@Crud({
  model: {
    type: DmloaikhoiEntity,
  },
  routes: {
    // getOneBase: {
    //   decorators: [Roles(RoleType.ADMIN)],
    // },
    deleteOneBase: {
      decorators: [Roles(RoleType.ADMIN)],
    },
    getManyBase: {
      decorators: [Roles(RoleType.ADMIN)],
    },
    updateOneBase: {
      decorators: [Roles(RoleType.ADMIN)],
      interceptors: [new UpdateInterceptor()],
    },
    createOneBase: {
      decorators: [Roles(RoleType.ADMIN)],
      interceptors: [new CreateInterceptor()],
    },
  },
})

@Controller('dmloaikhoi')
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
@ApiTags('dmloaikhoi')
@UsePipes(new ValidationPipe())
export class DmloaikhoiController implements CrudController<DmloaikhoiEntity> {
  constructor(
    public service: DmloaikhoiService
  ) {

  }

}
