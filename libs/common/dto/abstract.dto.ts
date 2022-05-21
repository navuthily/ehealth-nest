import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import type { AbstractEntity } from '../abstract.entity';

@ObjectType('AbstractDto')
export class AbstractDto {
  //   @ApiProperty()
  @FilterableField({ nullable: true })
  id: number;

  //   @ApiProperty()
  @FilterableField({ nullable: true })
  createdAt: Date;

  //   @ApiProperty()
  @FilterableField({ nullable: true })
  updatedAt: Date;

  constructor(entity: AbstractEntity) {
    this.id = entity?.id;
    this.createdAt = entity?.createdAt;
    this.updatedAt = entity?.updatedAt;
  }
}
