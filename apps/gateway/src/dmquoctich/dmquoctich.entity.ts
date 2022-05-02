import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'DM_QuocTich' })
export class DmquoctichEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_QuocTich' })
  id: number;

  @Column({ name: 'TenQuocTich' })
  tenquoctich?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmquoctich)
  nhanviens: UserEntity[]

}
