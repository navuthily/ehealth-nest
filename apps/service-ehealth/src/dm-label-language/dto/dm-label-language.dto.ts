import { SortDirection } from '@nestjs-query/core';
import {
  FilterableField,
  FilterableRelation,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { UserDto } from '../../user/dto/user-dto';
import {DmLanguageDTO} from '../../dm-language/dto/dm-language.dto';
import {DmLabelDTO} from '../../dm-label/dto/dm-label.dto';

@ObjectType('DmLabelLanguage')
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

@FilterableRelation('language', () => DmLanguageDTO, {
  nullable: true,
  disableRemove: true,
  disableUpdate: true,
})

@FilterableRelation('label', () => DmLabelDTO, {
  nullable: true,
  disableRemove: true,
  disableUpdate: true,
})

export class DmLabelLanguageDTO {
  @FilterableField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  id_language!: number;

  @FilterableField({ nullable: true })
  id_label!: number;

  @FilterableField({ nullable: true })
  value!: string;

  @FilterableField({ nullable: true })
  active?: boolean;

  @FilterableField({ nullable: true })
  nhanvientao_id?: string;
}
