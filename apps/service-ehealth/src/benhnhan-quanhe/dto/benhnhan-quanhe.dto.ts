import { SortDirection } from '@nestjs-query/core';
import {
  FilterableField,
  FilterableRelation,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { DMBenhNhanDTO } from '../../dmbenhnhan/dto/dmbenhnhan.dto';

@ObjectType('gd2benhnhanquanhe')
@QueryOptions({
  defaultSort: [{ field: 'ID_MoiQuanHe', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET,
  defaultResultSize: 100,
  maxResultsSize: 100,
  enableTotalCount: false,
})
@FilterableRelation('dmbenhnhan', () => DMBenhNhanDTO, {
  nullable: true,
  disableRemove: true,
  disableUpdate: true,
})

export class MoiQuanHeBenhNhanDTO {
  @FilterableField(() => ID)
  ID_MoiQuanHe!: number;

  @FilterableField({ nullable: true })
  ID_BenhNhan!: number;

  @FilterableField({ nullable: true })
  ID_BenhNhan_QuanHe!: number;

  @FilterableField({ nullable: true })
  ID_LoaiQuanHe!: number;

  @FilterableField({ nullable: true })
  HoLot_NguoiQuanHe?: string;

  @FilterableField({ nullable: true })
  Ten_NguoiQuanHe?: string;

  @FilterableField({ nullable: true })
  SDT_NguoiQuanHe?: string;

  @FilterableField({ nullable: true })
  NamSinh_NguoiQuanHe?: Date;

  @FilterableField({ nullable: true })
  NguoiTao?: number;

  @FilterableField({ nullable: true })
  NguoiSua?: number;

  @FilterableField({ nullable: true })
  DiaChi_NguoiLienHe?: string;

  @FilterableField({ nullable: true })
  is_daidien?: boolean;
}
