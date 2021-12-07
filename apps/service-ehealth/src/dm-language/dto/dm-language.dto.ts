import { SortDirection } from '@nestjs-query/core';
import { FilterableField, PagingStrategies, QueryOptions, FilterableRelation } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { UserDto } from '../../user/dto/user-dto';

@ObjectType('DmLanguage')
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
export class DmLanguageDTO {
  @FilterableField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  name!: string;

  @FilterableField({ nullable: true })
  code!: string;

  @FilterableField({ nullable: true })
  icon!: string;

  @FilterableField({ nullable: true })
  active?: boolean;

  @FilterableField({ nullable: true })
  nhanvientao_id?: number;
}
