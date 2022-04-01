import { ApiProperty } from '@nestjs/swagger';


export class ChamDiemDTO  {
    @ApiProperty({type: Number})
    id_tool?: number
  
    @ApiProperty({type: Number})
    id_luotkham?: number

    @ApiProperty({type: Number})
    tongdiem?: Date

    @ApiProperty({type: String})
    ketqua?: string




}