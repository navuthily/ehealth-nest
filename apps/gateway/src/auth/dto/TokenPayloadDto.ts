import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType('TokenPayloadDto')
export class TokenPayloadDto {
  @ApiProperty()
  @Field({ nullable: true })
  expiresIn: number;

  @ApiProperty()
  @Field({ nullable: true })
  accessToken: string;

  constructor(data: { expiresIn: number; accessToken: string }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
  }
}
