import { IsDefined, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, Validate } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;
export class nhomvattudto {

  @IsOptional({ groups: [CREATE,UPDATE] })
  id: string;

  @IsOptional({ groups: [CREATE,UPDATE] })
  nhom: string;

  @IsOptional({ groups: [CREATE,UPDATE] })
  is_bhcc: boolean;


}