import {
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
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: UserEntity,
  },


  query: {
    limit:20,
    join: {
      chucvu: {
        eager:false
      },
      chucdanh: {
        eager: false
      }, 
      thoihanhopdong: {
        eager: false
      }, 
      dmhopdong: {
        eager: false
      }, 
      dmtrinhdo: {
        eager: false
      },  
      dmdantoc: {
        eager: false
      },   
      dmquoctich: {
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
      tinhtranghonnhan:{
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
      nccchn:{
        eager:false
      },
      nccmnd:{
        eager:false
      },
      phamvichungchihanhnghe:{
        eager:false
      },
      phamvihanhnghebosung:{
        eager:false
      },
      dienthianhvans:{
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

}
