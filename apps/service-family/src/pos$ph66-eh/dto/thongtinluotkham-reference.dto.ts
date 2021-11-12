import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType, Directive } from '@nestjs/graphql';

@ObjectType('thongtinluotkham')
@Directive('@extends')
@Directive('@key(fields: "luotkhamId")')
export class ThongTinLuotKhamReferenceDTO {
  @FilterableField({})
  @Directive('@external')
  luotkhamId!: number;

  // @FilterableField()
  // thoigianvaokham: Date;
}
