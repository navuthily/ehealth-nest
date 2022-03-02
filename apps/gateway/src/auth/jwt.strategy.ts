import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { RoleType } from '@libs/common/constants/role-type';
import type { TokenType } from '@libs/common/constants/token-type';
import { ApiConfigService } from '@libs/shared/services/api-config.service';
import type { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public readonly configService: ApiConfigService,
    public readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.jwtSecret,
    });
  }

  async validate(args: {
    id: string;
    role: RoleType;
    type: TokenType;
  }): Promise<UserEntity> {
    // if (args.type !== TokenType.ACCESS_TOKEN) {
    //   throw new UnauthorizedException();
    // }
    // console.log(args);

    const user = await this.userService.findOne({
      id: args.id,
      //   role: args.role,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
