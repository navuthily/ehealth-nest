/* eslint-disable simple-import-sort/imports */
import type { UpdateOneInputType } from '@nestjs-query/query-graphql';
import { BeforeUpdateOne } from '@nestjs-query/query-graphql';
import { Field, InputType } from '@nestjs/graphql';
import type { UserContext } from 'modules/auth/auth.interfaces';
// import { CustomDateScalar } from '../../../common/custom-date.scalar';
import type { PhieuXuatNoiBoDTO } from './phieuxuatnoibo.dto';

@InputType('PhieuXuatNoiBoUpdateChotPhieu')
@BeforeUpdateOne(
  (input: UpdateOneInputType<PhieuXuatNoiBoDTO>, context: UserContext) => {
    if (typeof context.req.user.id === 'number') {
      input.update.nguoichot = context.req.user.id;
      input.update.ngaychot = new Date();
    }

    return input;
  },
)
export class PhieuXuatNoiBoUpdateChotPhieuDTO {
  @Field({ nullable: true })
  id: number;
  //   @Field({ nullable: true })
  //   nguoichot?: number;
  //   @Field({ nullable: true })
  //   ngaychot?: Date;
}
