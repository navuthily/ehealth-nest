import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserNotFoundException } from '@libs/exceptions/user-not-found.exception';
import { UtilsProvider } from '@libs/providers/utils.provider';
import { ApiConfigService } from '@libs/shared/services/api-config.service';
import type { UserDto } from '../user/dto/user-dto';
import type { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import type { UserLoginDto } from './dto/UserLoginDto';

@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ApiConfigService,
    public readonly userService: UserService,
  ) {}

  async createToken(user: UserEntity | UserDto): Promise<TokenPayloadDto> {
    console.log(user);

    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        id: user.id,
        holotNhanVien: user.holotNhanVien,
        tenNhanVien: user.tennhanvien,
        role: user.role,
      }, {secret: process.env.JWT_SECRET_KEY}),
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });

    console.log("////////", user)
    
    const isPasswordValid = await UtilsProvider.validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!user || !isPasswordValid) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
