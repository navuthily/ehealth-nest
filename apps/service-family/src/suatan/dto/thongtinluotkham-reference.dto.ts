// import {
//   CursorConnection,
//   OffsetConnection,
// } from '@nestjs-query/query-graphql';
import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';
// import { SuatAnDTO } from './suatan.dto';

@ObjectType('ThongTinLuotKham')
@Directive('@extends')
@Directive('@key(fields: "luotkhamId")')
// @OffsetConnection('suanans', () => SuatAnDTO)
export class ThongTinLuotKhamReferenceDTO {
  @Field(() => ID)
  @Directive('@external')
  luotkhamId!: number;
}
