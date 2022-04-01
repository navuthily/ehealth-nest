import { ApiProperty } from '@nestjs/swagger';
import { Lichsuchamdiemcap2sDTO } from './Lichsuchamdiemcap2sDTO'

export class UpdateChamDiemDTO  {
    @ApiProperty({type: Number})
    ID_AutoCap1?: number

    
    @ApiProperty({type: String})
    ketqua?: string


    @ApiProperty({type: Number})
    TongDiem?: number


    @ApiProperty({type : [Lichsuchamdiemcap2sDTO]})
    lichsuchamdiemcap2s: Lichsuchamdiemcap2sDTO[]

}