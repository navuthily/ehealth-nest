import { FilterableField } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';

@ObjectType('ModuleThanhVien')
export class ModuleThanhVienDTO {
  @FilterableField(() => ID)
  id!: number;

  @FilterableField({ nullable: true })
  moduleName!: string;

  @FilterableField({ nullable: true })
  nhomId!: number;
}
