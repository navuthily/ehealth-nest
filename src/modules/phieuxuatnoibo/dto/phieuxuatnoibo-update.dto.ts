/* eslint-disable simple-import-sort/imports */
import type { UpdateOneInputType } from '@nestjs-query/query-graphql';
import { BeforeUpdateOne } from '@nestjs-query/query-graphql';
import { Field, InputType } from '@nestjs/graphql';
import { AbstractUserInput } from 'common/dto/abstract-user.input';
import type { UserContext } from 'modules/auth/auth.interfaces';
// import { CustomDateScalar } from '../../../common/custom-date.scalar';
import type { PhieuXuatNoiBoDTO } from './phieuxuatnoibo.dto';

@InputType('PhieuXuatNoiBoUpdate')
export class PhieuXuatNoiBoUpdateDTO extends AbstractUserInput {
  @Field({ nullable: true })
  phieuxuatnoiboId: number;

  @Field()
  sophieu: number;
}
