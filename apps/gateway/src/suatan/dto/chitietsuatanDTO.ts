import { ApiProperty } from '@nestjs/swagger';

export class ChiTietSuatAnDTO  {
    @ApiProperty({type: Number})
    ID_phieu?: number
  
    @ApiProperty({type: String})
    Ma_vt?: string

    

    @ApiProperty({type: Number})
    So_luong?: number

    @ApiProperty({type: Number})
    Gia?: number
  


}