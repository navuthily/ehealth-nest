import { FilterableField, OffsetConnection } from '@nestjs-query/query-graphql';
import {
  Field,
  ID,
  // Directive,
  ObjectType,
} from '@nestjs/graphql';
import { Reference } from '@nestjs-query/query-graphql';
import { ThongTinLuotKhamReferenceDTO } from './thongtinluotkham-reference.dto';
import { SuatAnChiTietDTO } from '../../suatanchitiet/dto/suatanchitiet.dto';

@ObjectType('SuatAn')
// @Directive('@key(fields: "luotkhamId")')
@Reference(
  'thongtinluotkham',
  () => ThongTinLuotKhamReferenceDTO,
  { luotkhamId: 'luotkhamId' },
  { nullable: true },
)
@OffsetConnection('suatanchitiets', () => SuatAnChiTietDTO, {
  disableRemove: true,
  disableUpdate: true,
})
export class SuatAnDTO {
  @FilterableField(() => ID)
  phieuId!: number;

  @FilterableField()
  luotkhamId!: number;

  @FilterableField()
  benhnhanId!: number;

  @FilterableField()
  buoiId!: number;

  @Field()
  buoi?: string;

  @FilterableField({ nullable: true })
  diengiai?: string;

  @FilterableField({ nullable: true })
  ngaygioduyet?: Date;
}
