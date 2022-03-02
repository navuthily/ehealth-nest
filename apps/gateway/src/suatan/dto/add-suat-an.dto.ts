import { ApiProperty } from '@nestjs/swagger';
import { ChiTietSuatAnDTO } from './chitietsuatanDTO';

export class ThemSuatAnDTO  {
    @ApiProperty({type: Number})
    Id_NguoiTao?: number
  
    @ApiProperty({type: Number})
    Id_BenhNhan?: number

    @ApiProperty({type: Date})
    ngay_ct?: Date

    @ApiProperty({type: Number})
    Id_NguoiDuyet?: number

    @ApiProperty({type: Number})
    Loai?: number

    @ApiProperty({type: Number})
    Id_Buoi?: number

    @ApiProperty({type: Number})
    Id_LuotKham?: number

    @ApiProperty({type: Number})
    Diengiai?: string

    @ApiProperty({type : [ChiTietSuatAnDTO]})
    chitietsuatan: ChiTietSuatAnDTO[]  


}