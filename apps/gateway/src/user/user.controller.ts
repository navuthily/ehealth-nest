import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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

@Crud({
  model: {
    type: UserEntity,
  },
  query: {
    // limit:20,
    join: {
      chucvu: {
        eager:true
      },
      chucdanh: {
        eager: true,
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
      dmdonvi:{
        eager:false
      },         
      dmbophan:{
        eager:false
      },
      dmphongban:{
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
      chuyenkhoa:{
        eager:false
      },

      phamvichungchihanhnghe:{
        eager:false
      },
      phamvihanhnghebosung:{
        eager:false
      },

      nhanvienbangcaps:{
        eager:false
      },
      'nhanvienbangcaps.loaibangcap':{
        eager:false
      },
    }
  }
})
@Controller('users')
@ApiTags('users')
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
