import { SortDirection } from '@nestjs-query/core';
import { FilterableField, PagingStrategies, QueryOptions } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
// import { DMBenhNhanDTO } from '../../dmbenhnhan/dto/dmbenhnhan.dto';
// import { SuatAnReferenceDTO } from './suatan-reference.dto';
// import { Posph66EHReferenceDTO } from './pos$ph66-eh-reference.dto';

@ObjectType('ThongTinBenhVien')

@QueryOptions({
  defaultSort: [{ field: 'Id_BenhVien', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET,
  defaultResultSize: 100,
  maxResultsSize: 100,
  enableTotalCount: false,
})

export class ThongTinBenhVienDTO {
  @FilterableField(() => ID)
  Id_BenhVien!: number;

  @FilterableField({ nullable: true })
  TenBenhVien?: string;

}

