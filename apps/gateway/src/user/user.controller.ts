import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '@libs/common/constants/role-type';
import { PageDto } from '@libs/common/dto/page.dto';
import { AuthUser } from '@libs/decorators/auth-user.decorator';
import { Auth, UUIDParam } from '@libs/decorators/http.decorators';
import { TranslationService } from '@libs/shared/services/translation.service';
import { UserDto } from './dto/user-dto';
import { UsersPageOptionsDto } from './dto/users-page-options.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { Crud, CrudController , CrudRequest, Override, ParsedBody, ParsedRequest} from '@nestjsx/crud';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { Roles } from '@libs/decorators/roles.decorator';
import { UpdateInterceptor } from '../interceptor/updated-interceptor';
import { CreateInterceptor } from '../interceptor/created-interceptor';
import { AuthGuard } from '@libs/guards/auth.guard';
import { RolesGuard } from '@libs/guards/roles.guard';

@Crud({
  model: {
    type: UserEntity,
  },
  query: {
    // limit:20,
    join: {
      chucvu: {
        eager:false
      },
      chucdanh: {
        eager: false,
      }, 
      dmhopdong: {
        eager: false
      }, 
      dmtrinhdo: {
        eager: false
      },  

      dmloaitinhluong:{
        eager: false
      },
      dmnganhang:{
        eager:false
      },   
        
      dmbophan:{
        eager:false
      },

      dmloaikhoi:{
        eager:false
      },

      nhanvienhopdongs:{
        eager:false
      },
      'nhanvienhopdongs.loaihopdong':{
        eager:false
      },
      'dmbophan.phongban':{
        eager:false
      },
      chuyenkhoa:{
        eager:false
      },



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
      interceptors: [new UpdateInterceptor()],
    },
    createOneBase: {
      decorators: [Roles(RoleType.ADMIN)],
      interceptors: [new CreateInterceptor()],
    },
  },
})
@Controller('users')
@ApiBearerAuth()
@ApiTags('users')
@UseGuards(AuthGuard(), RolesGuard)


export class UserController implements CrudController<UserEntity> {
  constructor(
    private userService: UserService,
    private readonly translationService: TranslationService,
    public service: UserService
  ) {}
  get base(): CrudController<UserEntity> {
    return this;
  }
  @Override()
  async createOne(
    @Body() userDto: UserDto,
  ): Promise<UserDto> {

    const createdUser = await this.userService.createUser(
      userDto
    );
    return createdUser.toDto({
      isActive: true,
    });
  }
}
