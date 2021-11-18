import { FilterableField, OffsetConnection } from '@nestjs-query/query-graphql';
import {
  ID,
  // Directive,
  ObjectType,
} from '@nestjs/graphql';
import { Reference } from '@nestjs-query/query-graphql';
// import { ThongTinLuotKhamReferenceDTO } from './thongtinluotkham-reference.dto';
import { SuatAnChiTietDTO } from '../../suatanchitiet/dto/suatanchitiet.dto';

@ObjectType('DMVatTu')
// @Directive('@key(fields: "luotkhamId")')
// @Reference(
//   'thongtinluotkham',
//   () => ThongTinLuotKhamReferenceDTO,
//   { luotkhamId: 'luotkhamId' },
//   { nullable: true },
// )
// @OffsetConnection('suatanchitiets', () => SuatAnChiTietDTO, {
//   disableRemove: true,
//   disableUpdate: true,
// })
export class DMVatTuDTO {
  @FilterableField(() => ID)
  maVT!: number;

  @FilterableField()
  tenVT!: string;

  @FilterableField()
  soTT?: number;
}
