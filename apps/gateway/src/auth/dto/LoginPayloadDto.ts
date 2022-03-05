import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '../../user/dto/user-dto';
import { TokenPayloadDto } from './TokenPayloadDto';

@ObjectType('LoginPayloadDto')
export class LoginPayloadDto {
  @ApiProperty({ type: UserDto })
  @Field({ nullable: true })
  user: UserDto;

  @ApiProperty({ type: TokenPayloadDto })
  @Field({ nullable: true })
  token: TokenPayloadDto;

  constructor(user: UserDto, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
