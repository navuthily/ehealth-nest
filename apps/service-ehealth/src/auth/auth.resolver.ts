import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserLoginDto } from './dto/UserLoginDto';
import { LoginPayloadDto } from './dto/LoginPayloadDto';

// import { UserDto } from './dto/user-dto';
// import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Resolver(() => UserLoginDto)
export class AuthResolver {
  constructor(public readonly authService: AuthService) {}

  @Mutation((returns) => LoginPayloadDto)
  // @UseGuards(JwtAuthGuard)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<LoginPayloadDto> {

    const userEntity = await this.authService.validateUser({
      username,
      password,
    });

    const token = await this.authService.createToken(userEntity);

    return new LoginPayloadDto(userEntity.toDto(), token);
  }
}
