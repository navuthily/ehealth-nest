import {
  FilterableField,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';

import { AbstractDto } from '@libs/common/dto/abstract.dto';

export type TemplatehdDtoOptions = Partial<{ isActive: boolean }>;

@ObjectType('Templatehd')
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  maxResultsSize: 1000000,
  defaultResultSize: 1000000,
  enableTotalCount: false,
})

export class TemplatehdDTO extends AbstractDto {
  
  // @FilterableField({ nullable: true })
  // id?: number;
  @FilterableField({ nullable: true })
  createdBy?: number;

  @FilterableField({ nullable: true })
  updatedBy?: number;

  @FilterableField({ nullable: true })
  noidung?: string;

  @FilterableField({ nullable: true })
  loaitemplate?: string;
}
