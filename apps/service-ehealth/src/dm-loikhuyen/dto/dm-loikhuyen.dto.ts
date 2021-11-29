import { SortDirection } from '@nestjs-query/core';
import { FilterableField, PagingStrategies, QueryOptions } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
// import { DMBenhNhanDTO } from '../../dmbenhnhan/dto/dmbenhnhan.dto';
// import { SuatAnReferenceDTO } from './suatan-reference.dto';
// import { Posph66EHReferenceDTO } from './pos$ph66-eh-reference.dto';

@ObjectType('DmLoiKhuyen')
// @Directive('@key(fields: "luotkhamId")')
// @FilterableRelation('dmBenhNhan', () => DMBenhNhanDTO, {
//   nullable: true,
//   disableRemove: true,
//   disableUpdate: true,
// })
// @FilterableOffsetConnection('buonggiuongbenhs', () => BenhAnGiuongBenhDTO, {
//   nullable: true,
//   disableRemove: true,
//   disableUpdate: true,
//   defaultSort: [
//     { field: 'ngaygiobatdauSuDung', direction: SortDirection.DESC },
//   ],
//   defaultFilter: { trangthai: { neq: 'Hủy bỏ' } },
//   defaultResultSize: 1,
// })
@QueryOptions({
  defaultSort: [{ field: 'autoId', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET
})
export class DMLoiKhuyenDTO {
  @FilterableField(() => ID)
  autoId!: number;

  @FilterableField({ nullable: true })
  noidungloikhuyen?: string;


  
  // @FilterableField({ nullable: true })
  // active?: boolean;

  // @FilterableField({ nullable: true })
  // soluongbsthuchien?: number;
}

