import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'module' })
export class moduleEntity  {

  @PrimaryColumn()
  id: number;

  @Column({ name: 'module_name' })
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
