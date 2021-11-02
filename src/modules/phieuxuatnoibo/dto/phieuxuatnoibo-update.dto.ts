/* eslint-disable simple-import-sort/imports */
import type { UpdateOneInputType } from '@nestjs-query/query-graphql';
import { BeforeUpdateOne } from '@nestjs-query/query-graphql';
import { Field, InputType } from '@nestjs/graphql';
import type { UserContext } from 'modules/auth/auth.interfaces';
// import { CustomDateScalar } from '../../../common/custom-date.scalar';
import type { PhieuXuatNoiBoDTO } from './phieuxuatnoibo.dto';

@InputType('PhieuXuatNoiBoUpdate')
@BeforeUpdateOne(
  (input: UpdateOneInputType<PhieuXuatNoiBoDTO>, context: UserContext) => {
    if (typeof context.req.user.id === 'number') {
      input.update.nguoichot = context.req.user.id;
      input.update.ngaychot = new Date();
    }

    return input;
  },
)
export class PhieuXuatNoiBoUpdateDTO {
  @Field({ nullable: true })
  id: number;

  @Field()
  sophieu: number;
}
