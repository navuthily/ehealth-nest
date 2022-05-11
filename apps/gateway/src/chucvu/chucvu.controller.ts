import {
  Controller, UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import {  ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChucvuService } from './chucvu.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { ChucvuEntity } from './chucvu.entity';
import { RolesGuard } from '@libs/guards/roles.guard';
import { Roles } from '@libs/decorators/roles.decorator';
import { RoleType } from '@libs/common/constants/role-type';
import { UpdateInterceptor } from '../interceptor/updated-interceptor';
import { CreateInterceptor } from '../interceptor/created-interceptor';
import { AuthGuard } from '@libs/guards/auth.guard';

@Crud({
  model: {
    type: ChucvuEntity,
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
@Controller('chucvu')
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
@ApiTags('chucvu')
@UsePipes(new ValidationPipe())
export class ChucvuController implements CrudController<ChucvuEntity> {
  constructor(
    public service: ChucvuService
  ) {

  }

}
