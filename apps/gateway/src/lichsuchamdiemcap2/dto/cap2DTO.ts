import { ApiProperty } from '@nestjs/swagger';
import { Lichsuchamdiemcap2sDTO } from './Lichsuchamdiemcap2sDTO'

export class Cap2DTO  {
    @ApiProperty({type: Number})
    ID_BsCham?: number
  
    @ApiProperty({type: Number})
    ID_BenhNhan?: number

    @ApiProperty({type: Number})
    ID_LuotKham?: Date

    @ApiProperty({type: String})
    ketqua?: string

    @ApiProperty({type: String})
    ID_Tool?: string


    @ApiProperty({type: String})
    TongDiem?: number

    @ApiProperty({type : [Lichsuchamdiemcap2sDTO]})
    lichsuchamdiemcap2s: Lichsuchamdiemcap2sDTO[]

}