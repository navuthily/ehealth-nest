import {
  BeforeCreateOne,
  BeforeUpdateOne,
  CreateOneInputType,
  FilterableField,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { AbstractUserEntity } from 'common/abstract-user.entity';
import { UserContext } from 'modules/auth/auth.interfaces';
import { AbstractDto } from './abstract.dto';

@ObjectType('AbstractDto')
export class AbstractUserDto extends AbstractDto {
  @FilterableField({ nullable: true })
  createdBy: string;

  @FilterableField({ nullable: true })
  updatedBy: string;

  constructor(entity: AbstractUserEntity) {
    super(entity);
    this.createdBy = entity.createdBy;
    this.updatedBy = entity.updatedBy;
  }
}
