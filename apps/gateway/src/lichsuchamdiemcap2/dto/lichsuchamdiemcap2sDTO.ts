import { ApiProperty } from '@nestjs/swagger';


export class Lichsuchamdiemcap2sDTO  {
    @ApiProperty({type: Number})
    ID_CauHinhCap3?: number
  
    @ApiProperty({type: Number})
    Value?: number

    @ApiProperty({type: Number})
    Diem?: number



}