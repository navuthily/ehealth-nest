/* eslint-disable simple-import-sort/imports */
import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType('dm_benhnhan')
export class DMBenhNhanDTO {
  @FilterableField()
  maBenhNhan: string;

  @FilterableField()
  hoLotBenhNhan: string;

  @FilterableField()
  tenBenhNhan: string;
}
