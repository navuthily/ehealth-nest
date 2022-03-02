import { ApiProperty } from '@nestjs/swagger';

export class ChiTietSuatAnDTO  {
  
    @ApiProperty({type: String})
    Ma_vt?: string

    

    @ApiProperty({type: Number})
    So_luong?: number

  


}