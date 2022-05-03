
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
@Crud({
  model: {
    type: NhanvienhopdongEntity,
  },
  query:{
    join:{
      loaihopdong:{eager:true},
      nhanvien:{eager:true},
    }
    
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
    },
    createOneBase:{
      decorators: [Roles(RoleType.ADMIN)],
    }
  },

})
@Controller('nhanvienhopdong')
// @UseGuards(AuthGuard(), RolesGuard)
// @ApiBearerAuth()
@ApiTags('nhanvienhopdong')
@UsePipes(new ValidationPipe())
export class NhanvienhopdongController
  implements CrudController<NhanvienhopdongEntity>
{
  constructor(
    public service: NhanvienhopdongService,
  ) {}

  get base(): CrudController<NhanvienhopdongEntity> {
    return this;
  }

}
