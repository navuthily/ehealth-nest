import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType, ID } from '@nestjs/graphql';

@ObjectType('DMBuongGiuongBenh')
export class DMBuongGiuongBenhDTO {
  @FilterableField(() => ID)
  buongiuongId!: number;

  @FilterableField()
  tenbuongiuong!: number;
}
