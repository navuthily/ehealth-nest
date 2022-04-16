import { CrudValidationGroups } from '@nestjsx/crud';
import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, Validate } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';

const { CREATE, UPDATE } = CrudValidationGroups;
@Entity({ name: 'module' })
export class moduleEntity  {

  @PrimaryColumn()
  id: number;
  
  @Column({ name: 'module_name'})
  module_name?: string;
  
  @Column({ name: 'datlichtruoctoida' })
  datlichtruoctoida?: string;
  
  @Column({ name: 'datlichtruoctoithieu' })
  datlichtruoctoithieu?: string;

  @Column({ name: 'create_by' })
  nguoitao?: string;

  @Column({ name: 'update_by' })
  nguoisua?: string;

}
