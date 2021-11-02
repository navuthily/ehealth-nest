/* eslint-disable simple-import-sort/imports */
import type { CreateOneInputType } from '@nestjs-query/query-graphql';
import { BeforeCreateOne, FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import type { UserContext } from 'modules/auth/auth.interfaces';
// import { CustomDateScalar } from '../../../common/custom-date.scalar';

@ObjectType('Gd2_PhieuXuatNoiBo')
@BeforeCreateOne(
  (input: CreateOneInputType<PhieuXuatNoiBoDTO>, context: UserContext) => {
    if (typeof context.req.user.id === 'number') {
      input.input.idNguoiTao = context.req.user.id;
    }

    return input;
  },
)
// @BeforeUpdateOne(
//   (input: UpdateOneInputType<PhieuXuatNoiBoDTO>, context: UserContext) => {
//     console.log(input);

//     // if (typeof context.req.user.id === 'number')
//     //   input.input.idNguoiTao = context.req.user.id;
//     return input;
//   },
// )
export class PhieuXuatNoiBoDTO {
  @FilterableField()
  id: number;

  @FilterableField({ nullable: true })
  idNguoiTao: number;

  @FilterableField({ nullable: true })
  ngaygiotao: Date;

  @FilterableField({ nullable: true })
  sophieu: number;

  @FilterableField({ nullable: true })
  nguoichot?: number;

  @FilterableField({ nullable: true })
  ngaychot?: Date;
}
