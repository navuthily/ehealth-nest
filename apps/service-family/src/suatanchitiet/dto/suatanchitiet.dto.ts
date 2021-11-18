import {
  FilterableField,
  OffsetConnection,
  Relation,
} from '@nestjs-query/query-graphql';
import {
  ID,
  // Directive,
  ObjectType,
} from '@nestjs/graphql';
import { Reference } from '@nestjs-query/query-graphql';
import { SuatAnDTO } from '../../suatan/dto/suatan.dto';
import { DMVatTuDTO } from '../../dmvt2/dto/dmvt2.dto';
// import { ThongTinLuotKhamReferenceDTO } from './thongtinluotkham-reference.dto';

@ObjectType('SuatAnChiTiet')
// @Directive('@key(fields: "luotkhamId")')
// @Reference(
//   'thongtinluotkham',
//   () => ThongTinLuotKhamReferenceDTO,
//   { luotkhamId: 'luotkhamId' },
//   { nullable: true },
// )
@Relation('suatan', () => SuatAnDTO, {
  disableRemove: true,
  disableUpdate: true,
})
@Relation('vattu', () => DMVatTuDTO, {
  disableRemove: true,
  disableUpdate: true,
})
export class SuatAnChiTietDTO {
  @FilterableField(() => ID)
  id!: number;

  @FilterableField()
  phieuId!: number;

  @FilterableField({ nullable: true })
  soluong?: number;

  @FilterableField({ nullable: true })
  gia?: number;

  @FilterableField({ nullable: true })
  thanhtien?: number;
}
