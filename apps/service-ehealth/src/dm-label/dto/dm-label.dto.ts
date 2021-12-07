import { SortDirection } from '@nestjs-query/core';
import { FilterableField, PagingStrategies, QueryOptions, FilterableRelation } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { ThongTinBenhVienDTO } from '../../thongtinbenhvien/dto/thongtinbenhvien.dto';
import { UserDto } from '../../user/dto/user-dto';

@ObjectType('DmLabel')
@QueryOptions({
  defaultSort: [{ field: 'id', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET,
  defaultResultSize: 100,
  maxResultsSize: 100,
  enableTotalCount: false,
})
@FilterableRelation('user', () => UserDto, {
  nullable: true,
  disableRemove: true,
  disableUpdate: true,
})



export class DmLabelDTO {
  @FilterableField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  keyname!: string;

  @FilterableField({ nullable: true })
  notes!: string;

  @FilterableField({ nullable: true })
  active!: boolean;

  @FilterableField({ nullable: true })
  nhanvientao_id?: number;

  @FilterableField({ nullable: true })
  Id_BenhVien?: number;
}
