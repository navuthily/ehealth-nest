import { FilterableField } from '@nestjs-query/query-graphql';
import { Directive, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('ModuleThanhVien')
@Directive('@key(fields: "id")')
export class ModuleThanhVienDTO {
  @FilterableField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  moduleName!: string;

  @FilterableField({ nullable: true })
  nhomId!: number;
}
