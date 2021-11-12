import {
  FilterableField,
  FilterableOffsetConnection,
  FilterableRelation,
  Reference,
} from '@nestjs-query/query-graphql';
import { Directive, ObjectType } from '@nestjs/graphql';
import { ThongTinLuotKhamReferenceDTO } from './thongtinluotkham-reference.dto';

@ObjectType('Posph66EhH')
@Directive('@key(fields: "luotkhamId")')
@Reference(
  'thongtinluotkham',
  () => ThongTinLuotKhamReferenceDTO,
  { luotkhamId: 'luotkhamId' },
  { nullable: true },
)
export class Posph66EhHDTO {
  @FilterableField()
  id: number;

  @FilterableField()
  luotkhamId: number;

  @FilterableField()
  ngay_ct: Date;
}
