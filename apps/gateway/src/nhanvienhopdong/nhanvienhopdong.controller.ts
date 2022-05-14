import { AuthGuard } from '@libs/guards/auth.guard';
import {
  Controller,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { NhanvienhopdongService } from './nhanvienhopdong.service';
import { NhanvienhopdongEntity } from './nhanvienhopdong.entity';
import { RoleType } from '@libs/common/constants/role-type';
import { Roles } from '@libs/decorators/roles.decorator';
import { RolesGuard } from '@libs/guards/roles.guard';
import { CreateInterceptor } from '../interceptor/created-interceptor';
import { UpdateInterceptor } from '../interceptor/updated-interceptor';
@Crud({
  model: {
    type: NhanvienhopdongEntity,
  },
  query: {
    join: {
      loaihopdong: { eager: false },
      nhanvien: { eager: false },
    },
  },
  routes: {
    getOneBase: {
      decorators: [Roles(RoleType.ADMIN)],
    },
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
@Controller('nhanvienhopdong')
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
@ApiTags('nhanvienhopdong')
@UsePipes(new ValidationPipe())
export class NhanvienhopdongController
  implements CrudController<NhanvienhopdongEntity>
{
  constructor(public service: NhanvienhopdongService) {}

  get base(): CrudController<NhanvienhopdongEntity> {
    return this;
  }
}
