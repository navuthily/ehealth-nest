import { SortDirection } from '@nestjs-query/core';
import {
  CursorConnection,
  FilterableField,
  FilterableOffsetConnection,
  FilterableRelation,
  PagingStrategies,
  QueryOptions,
  OffsetConnection,
  Relation,
} from '@nestjs-query/query-graphql';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { DMLoiKhuyenDTO } from '../../dm-loikhuyen/dto/dm-loikhuyen.dto';
import { DMModuleLoaiKhamDTO } from './dm-module-loaikham.dto';
// import { DMBenhNhanDTO } from '../../dmbenhnhan/dto/dmbenhnhan.dto';
// import { SuatAnReferenceDTO } from './suatan-reference.dto';
// import { Posph66EHReferenceDTO } from './pos$ph66-eh-reference.dto';

@ObjectType('DmLoaiKham')
// @Directive('@key(fields: "luotkhamId")')
// @FilterableRelation('dmBenhNhan', () => DMBenhNhanDTO, {
//   nullable: true,
//   disableRemove: true,
//   disableUpdate: true,
// })
@Relation('dmLoiKhuyen', () => DMLoiKhuyenDTO, {
  nullable: true,
  disableRemove: true,
  disableUpdate: true,
  // defaultSort: [
  //   { field: 'ngaygiobatdauSuDung', direction: SortDirection.DESC },
  // ],
  // defaultFilter: { trangthai: { neq: 'Hủy bỏ' } },
  defaultResultSize: 1,
}) 
@Relation('dmModuleLoaiKhams', () => DMModuleLoaiKhamDTO,{
  disableRemove: true,
  disableUpdate: true,
  nullable: true,
} )
@OffsetConnection('dmModuleLoaiKhams', () => DMModuleLoaiKhamDTO, {
  disableRemove: true,
  disableUpdate: true,
  nullable: true,
})
@QueryOptions({
  defaultSort: [{ field: 'ID_LoaiKham', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET,
  defaultResultSize: 100,
  maxResultsSize: 100,
  enableTotalCount: false,
})
@InputType('DMLoaiKhamDTO')
export class DMLoaiKhamDTO {
  @FilterableField(() => ID)
  ID_LoaiKham!: number;

  @FilterableField({ nullable: true })
  TenLoaiKham?: string;

  @FilterableField({ nullable: true })
  id?: number;

  @FilterableField({ nullable: true })
  Active?: boolean;

  @FilterableField({ nullable: true })
  SoLuongBs_ThucHien?: number;

  @FilterableField({ nullable: true })
  LoiKhuyen_App?: number;

  @FilterableField({ nullable: true })
  maviettat?: string;

  @FilterableField({ nullable: true })
  maviettatbn?: string;

  @FilterableField({ nullable: true })
  nhomclsId?: number;
  
  @FilterableField({ nullable: true })
  mota?: string;

  @FilterableField({ nullable: true })
  giabaochobn?: number;

  @FilterableField({ nullable: true })
  SoLuongNhanVien_ThucHien?: number;

  @FilterableField({ nullable: true })
  IsTamUng?: boolean;
  
  @FilterableField({ nullable: true })
  IsDauHieuSinhTon?: boolean;
  
  @FilterableField({ nullable: true })
  GioiTinh_LoaiKham?: number;

  @FilterableField({ nullable: true })
  IsSoLuongNhieu?: boolean;

  @FilterableField({ nullable: true })
  YNghia?: string;


  // @FilterableField({ nullable: true })
  // active?: boolean;

  // @FilterableField({ nullable: true })
  // soluongbsthuchien?: number;
  // @FilterableField({ nullable: true })
  // @Field()
  // dmModuleLoaiKhams: DMModuleLoaiKhamDTO[]
}
