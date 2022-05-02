import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_DM_LoaiKhoi' })
export class DmloaikhoiEntity  {


  @PrimaryGeneratedColumn({ name: 'Id_LoaiKhoi' })
  id: number;

  @Column({ name: 'TenLoaiKhoi' })
  tenloaikhoi?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmloaikhoi)
  nhanviens: UserEntity[]

}
