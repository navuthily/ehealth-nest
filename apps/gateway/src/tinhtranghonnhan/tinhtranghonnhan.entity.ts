import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'gd2_tinhtranghonnhan' })
export class TinhtranghonnhanEntity  {


  @PrimaryColumn({ name: 'Id_TinhTrangHonNhan' })
  id: number;

  @Column({ name: 'TenTinhTrangHonNhan' })
  tinhtranghonnhan?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.tinhtranghonnhan)
  nhanviens: UserEntity[]

}
