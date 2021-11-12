import {
  FilterableField,
  FilterableOffsetConnection,
  FilterableRelation,
  Reference,
} from '@nestjs-query/query-graphql';
import { Directive, ObjectType } from '@nestjs/graphql';

@ObjectType('thongtinluotkham')
@Directive('@key(fields: "luotkhamId")')
export class ThongTinLuotKhamDTO {

  @FilterableField()
  luotkhamId: number;

  @FilterableField({nullable:true})
  thoigianvaokham: Date;

  @FilterableField({nullable:true})
  benhnhanId: number;

  @FilterableField({nullable:true})
  bsyeucau: number;

  @FilterableField({nullable:true})
  phanloai: number;
}
