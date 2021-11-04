/* eslint-disable simple-import-sort/imports */
import { SortDirection } from '@nestjs-query/core';
import {
  FilterableField,
  FilterableRelation,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { DMBenhNhanDTO } from '../../dm-benhnhan/dto/dm-benhnhan.dto';

@ObjectType('ThongTinLuotkham')
@FilterableRelation('DM_BenhNhan', () => DMBenhNhanDTO, {
  nullable: true,
})
@QueryOptions({
  defaultSort: [{ field: 'id', direction: SortDirection.ASC }],
})
@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
export class ThongTinLuotKhamDTO {
  @FilterableField()
  id: number;

  @FilterableField()
  idBenhNhan: number;

  @FilterableField()
  thoiGianVaoKham: Date;

  //   @FilterableField(() => ID)
  //   tenBenhNhan: string;
}
