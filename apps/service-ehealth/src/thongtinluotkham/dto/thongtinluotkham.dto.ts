import { SortDirection } from '@nestjs-query/core';
import {
  FilterableField,
  FilterableOffsetConnection,
  FilterableRelation,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Directive, ID, ObjectType } from '@nestjs/graphql';
import { BenhAnGiuongBenhDTO } from '../../BenhAnGiuongBenh/dto/BenhAnGiuongBenh.dto';
import { DMBenhNhanDTO } from '../../dmbenhnhan/dto/dmbenhnhan.dto';
// import { DMBenhNhanDTO } from '../../dmbenhnhan/dto/dmbenhnhan.dto';
// import { SuatAnReferenceDTO } from './suatan-reference.dto';
// import { Posph66EHReferenceDTO } from './pos$ph66-eh-reference.dto';

@ObjectType('ThongTinLuotKham')
@Directive('@key(fields: "luotkhamId")')
// @Reference(
//   'suatan',
//   () => SuatAnReferenceDTO,
//   { luotkhamId: 'luotkhamId' },
//   { nullable: true },
// )
@FilterableRelation('dmBenhNhan', () => DMBenhNhanDTO, {
  nullable: true,
  disableRemove: true,
  disableUpdate: true,
})
// @FilterableOffsetConnection('buonghientai', () => BenhAnGiuongBenhDTO, {
//   nullable: true,
//   disableRemove: true,
//   disableUpdate: true,
//   defaultSort: [
//     { field: 'ngaygiobatdauSuDung', direction: SortDirection.DESC },
//   ],
//   defaultFilter: { trangthai: { neq: 'Hủy bỏ' } },
//   defaultResultSize: 1,
// })
@FilterableOffsetConnection('buonggiuongbenhs', () => BenhAnGiuongBenhDTO, {
  nullable: true,
  disableRemove: true,
  disableUpdate: true,
  defaultSort: [
    { field: 'ngaygiobatdauSuDung', direction: SortDirection.DESC },
  ],
  defaultFilter: { trangthai: { neq: 'Hủy bỏ' } },
  defaultResultSize: 1,
})
@QueryOptions({
  defaultSort: [{ field: 'benhnhanId', direction: SortDirection.ASC }],
})
@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
export class ThongTinLuotKhamDTO {
  @FilterableField(() => ID)
  luotkhamId!: number;

  @FilterableField({ nullable: true })
  benhnhanId!: number;
}
