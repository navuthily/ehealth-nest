import { SortDirection } from '@nestjs-query/core';
import {
  FilterableField,
  PagingStrategies,
  QueryOptions,
  Relation,
  Reference
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { DMLoaiKhamDTO } from './dm-loaikham.dto';
import { DMModuleReferenceDTO } from './dm-module-reference.dto';
// import { DMBenhNhanDTO } from '../../dmbenhnhan/dto/dmbenhnhan.dto';
// import { SuatAnReferenceDTO } from './suatan-reference.dto';
// import { Posph66EHReferenceDTO } from './pos$ph66-eh-reference.dto';

@ObjectType('DmModuleLoaiKham')
// @Directive('@key(fields: "luotkhamId")')

// @FilterableRelation('dmLoaiKham', () => DMLoaiKhamDTO, {
//   nullable: true,
//   disableRemove: true,
//   disableUpdate: true,
//   // defaultSort: [
//   //   { field: 'ngaygiobatdauSuDung', direction: SortDirection.DESC },
//   // ],
//   // defaultFilter: { trangthai: { neq: 'Hủy bỏ' } },
//   defaultResultSize: 1,
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


@Reference('dmmodule',()=>DMModuleReferenceDTO,{
  id:"moduleId"
})
@QueryOptions({
  defaultSort: [{ field: 'id', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@Relation('DmLoaiKham', () => DMLoaiKhamDTO, {nullable: true})
export class DMModuleLoaiKhamDTO {
  @FilterableField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  moduleId?: number;

  @FilterableField({ nullable: true })
  loaikhamId?: number;

  @FilterableField({ nullable: true })
  tenloaikham?: string;

  // @FilterableField({ nullable: true })
  // active?: boolean;

  // @FilterableField({ nullable: true })
  // soluongbsthuchien?: number;
}
