import { ApiProperty } from '@nestjs/swagger';

export class dataFilterDTO {
  @ApiProperty()
  tungay: string;

  @ApiProperty()
  denngay: string;

  @ApiProperty()
  stored: string;
}
