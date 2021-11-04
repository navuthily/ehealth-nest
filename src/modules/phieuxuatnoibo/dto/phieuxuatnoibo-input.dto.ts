/* eslint-disable simple-import-sort/imports */

import {
  BeforeCreateOne,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
import { Field, InputType } from '@nestjs/graphql';
import { AbstractUserDto } from 'common/dto/abstract-user.dto';
import { AbstractUserInput } from 'common/dto/abstract-user.input';
import { UserContext } from 'modules/auth/auth.interfaces';
// import { CustomDateScalar } from '../../../common/custom-date.scalar';

@InputType('PhieuXuatNoiBoInput')
export class PhieuXuatNoiBoInputDTO extends AbstractUserInput {
  @Field()
  sophieu: number;
}
