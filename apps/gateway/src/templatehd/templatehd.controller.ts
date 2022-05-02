import { AuthGuard } from '@libs/guards/auth.guard';
import {
  Controller,
  Get,
  SetMetadata,
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
import { TemplateHdService } from './templatehd.service';
import { TemplateHdEntity } from './templatehd.entity';
import { RoleType } from '@libs/common/constants/role-type';
import { Roles } from '@libs/decorators/roles.decorator';
import { RolesGuard } from '@libs/guards/roles.guard';
import { GetCurrentUserById } from '../getUser/getbyuser';
import { database } from 'firebase-admin';

@Crud({
  model: {
    type: TemplateHdEntity,
  },
  query: {
    alwaysPaginate: true,
    // limit:5,
    join: {
      nguoitao: {
        eager: false,
      },
      nguoisua: {
        eager: false,
      },
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
    },
    createOneBase:{
      decorators: [Roles(RoleType.ADMIN)],
    }
  },
})
@Controller('templatehd')
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
@ApiTags('templatehd')
export class TemplateHdController implements CrudController<TemplateHdEntity> {
  constructor(public service: TemplateHdService) {}

  get base(): CrudController<TemplateHdEntity> {
    return this;
  }

}
