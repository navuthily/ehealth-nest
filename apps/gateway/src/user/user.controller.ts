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
})
@Controller('users')
@ApiTags('users')
export class UserController implements CrudController<UserEntity> {
  constructor(
    private userService: UserService,
    private readonly translationService: TranslationService,
    public service: UserService
  ) {}

  // @Get('admin')
  // @Auth([RoleType.USER])
  // @HttpCode(HttpStatus.OK)
  // async admin(@AuthUser() user: UserEntity): Promise<string> {
  //   const translation = await this.translationService.translate(
  //     'keywords.admin',
  //     {
  //       lang: 'en',
  //     },
  //   );

  //   return `${translation} ${user.username}`;
  // }

  // @Get()
  // @Auth([RoleType.USER])
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Get users list',
  //   type: PageDto,
  // })
  // getUsers(
  //   @Query(new ValidationPipe({ transform: true }))
  //   pageOptionsDto: UsersPageOptionsDto,
  // ): Promise<PageDto<UserDto>> {
  //   return this.userService.getUsers(pageOptionsDto);
  // }

  // @Get(':id')
  // @Auth([RoleType.USER])
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Get users list',
  //   type: UserDto,
  // })
  // getUser(@UUIDParam('id') userId: string): Promise<UserDto> {
  //   return this.userService.getUser(userId);
  // }
}
