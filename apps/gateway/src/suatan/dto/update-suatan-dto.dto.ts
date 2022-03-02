import { ApiProperty } from '@nestjs/swagger';
import { ChiTietSuatAnDTO } from './chitietsuatanDTO';

export class UpdateSuatAnDTO  {



    @ApiProperty({type: Number})
    Loai?: number

    @ApiProperty({type: String})
    Diengiai?: string

    @ApiProperty({type : [ChiTietSuatAnDTO]})
    chitietsuatan: ChiTietSuatAnDTO[]  


}