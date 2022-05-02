import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'gd2_tinhtranghonnhan' })
export class TinhtranghonnhanEntity  {


  @PrimaryGeneratedColumn({ name: 'Id_TinhTrangHonNhan' })
  id: number;

  @Column({ name: 'TenTinhTrangHonNhan' })
  tinhtranghonnhan?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.tinhtranghonnhan)
  nhanviens: UserEntity[]

}
