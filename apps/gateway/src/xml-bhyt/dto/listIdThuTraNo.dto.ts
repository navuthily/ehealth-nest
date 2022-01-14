import { ApiProperty } from '@nestjs/swagger';

export class ListIdThuTraNoJsonDTO {
  @ApiProperty({
    description: 'List json array ID_ThuTraNo',
    default: '["3795716","3795718","3795843"]',
  })
  idThuTraNo: string;
}
