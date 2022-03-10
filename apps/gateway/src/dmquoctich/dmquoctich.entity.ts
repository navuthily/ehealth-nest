import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_QuocTich' })
export class DmquoctichEntity  {


  @PrimaryColumn({ name: 'ID_QuocTich' })
  id: number;

  @Column({ name: 'TenQuocTich' })
  tenquoctich?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmquoctich)
  nhanviens: UserEntity[]

}
