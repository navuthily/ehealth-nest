/* eslint-disable simple-import-sort/imports */

import { Field, InputType } from '@nestjs/graphql';
// import { CustomDateScalar } from '../../../common/custom-date.scalar';

@InputType('PhieuXuatNoiBoInput')
// @BeforeCreateOne(
//   (
//     input: CreateOneInputType<PhieuXuatNoiBoInputDTO>,
//     context: UserContext,
//   ) => {
//     if (typeof context.req.user.id === 'number')
//       input.input.idNguoiTao = context.req.user.id;
//     return input;
//   },
// )
export class PhieuXuatNoiBoInputDTO {
  @Field()
  sophieu: number;
}
