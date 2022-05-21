import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Trim } from '@libs/decorators/transforms.decorator';
@ObjectType('UserLoginDto')
export class UserLoginDto {
  @ApiProperty()
  @IsString()
  @Trim()
  email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  password: string;
}
