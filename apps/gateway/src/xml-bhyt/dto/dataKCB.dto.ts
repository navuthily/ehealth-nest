import { ApiProperty } from '@nestjs/swagger';

export class dataKCBDTO {
  @ApiProperty()
  maThe: string;

  @ApiProperty()
  hoTen: string;

  @ApiProperty()
  ngaySinh: string;

  @ApiProperty()
  gioiTinh: string;

  @ApiProperty()
  maCSKCB: string;
}
