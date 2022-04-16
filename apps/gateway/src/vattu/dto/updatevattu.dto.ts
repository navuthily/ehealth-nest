import { IsDefined, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, Validate } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;
export class updatevattu {

  Ma_vt: string;

  So_tt: string;

  Barcode: string;

  Ten_vt: string;

  Dvt: string;

  @IsOptional({ groups: [UPDATE] })
  id_dm_nhomvattu: string;

}