import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ObjectType, ID } from '@nestjs/graphql';

export class NhaXeDTO {
  barcode: string;
  plateNumber: string;
}
