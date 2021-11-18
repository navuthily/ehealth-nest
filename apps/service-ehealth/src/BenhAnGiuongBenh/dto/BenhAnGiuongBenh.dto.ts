import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { ObjectType, ID } from '@nestjs/graphql';
import { DMBuongGiuongBenhDTO } from '../../DMBuongGiuongBenh/dto/DMBuongGiuongBenh.dto';

@Relation('buonggiuongbenh', () => DMBuongGiuongBenhDTO, {
  disableRemove: true,
  disableUpdate: true,
})
@ObjectType('BenhAnGiuongBenh')
export class BenhAnGiuongBenhDTO {
  @FilterableField(() => ID)
  benhangiuongbenhId!: number;

  @FilterableField()
  luotkhamId!: number;

  @FilterableField()
  buongiuongId!: number;

  @FilterableField()
  trangthai?: string;

  @FilterableField()
  ngaygiobatdauSuDung?: Date;
}
