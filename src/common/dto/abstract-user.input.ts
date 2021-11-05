import {
  BeforeCreateOne,
  BeforeUpdateOne,
  CreateOneInputType,
  FilterableField,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AbstractUserEntity } from 'common/abstract-user.entity';
import { UserContext } from 'modules/auth/auth.interfaces';
import { AbstractDto } from './abstract.dto';

@InputType('AbstractUserInput')
@BeforeCreateOne(
  (input: CreateOneInputType<AbstractUserInput>, context: UserContext) => {
    input.input.createdBy = context.req.user.id;
    return input;
  },
)
@BeforeUpdateOne(
  (input: UpdateOneInputType<AbstractUserInput>, context: UserContext) => {
    input.update.updatedBy = context.req.user.id;
    return input;
  },
)
export class AbstractUserInput {
  @FilterableField({ nullable: true })
  createdBy?: string;
  @FilterableField({ nullable: true })
  updatedBy?: string;
}
