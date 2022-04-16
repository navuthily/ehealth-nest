import { IsDefined, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, Validate } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;
export class updateThoigianDatLichDto {
  id: number;

  module_name: string;

  @IsOptional({ groups: [UPDATE] })
  datlichtruoctoida: string;

  @IsOptional({ groups: [UPDATE] })
  datlichtruoctoithieu: string;

  nguoitao: string;

  nguoisua: string;
}