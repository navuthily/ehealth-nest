import {
  Controller, UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import {  ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChuyenkhoaService } from './chuyenkhoa.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { ChuyenkhoaEntity } from './chuyenkhoa.entity';

import { RolesGuard } from '@libs/guards/roles.guard';
import { Roles } from '@libs/decorators/roles.decorator';
import { RoleType } from '@libs/common/constants/role-type';
import { UpdateInterceptor } from '../interceptor/updated-interceptor';
import { CreateInterceptor } from '../interceptor/created-interceptor';
import { AuthGuard } from '@libs/guards/auth.guard';
@Crud({
  model: {
    type: ChuyenkhoaEntity,
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
@Controller('chuyenkhoa')
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
@ApiTags('chuyenkhoa')
@UsePipes(new ValidationPipe())
export class ChuyenkhoaController implements CrudController<ChuyenkhoaEntity> {
  constructor(
    public service: ChuyenkhoaService
  ) {

  }

}
