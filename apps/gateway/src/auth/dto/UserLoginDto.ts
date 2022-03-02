import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@ObjectType('UserLoginDto')
export class UserLoginDto {
  @IsString()
  //   @IsEmail()
  @ApiProperty()
  @Field({ nullable: true })
  readonly username: string;

  @IsString()
  @ApiProperty()
  @Field({ nullable: true })
  readonly password: string;
}
