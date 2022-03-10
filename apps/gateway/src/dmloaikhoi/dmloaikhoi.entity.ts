import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_DM_LoaiKhoi' })
export class DmloaikhoiEntity  {


  @PrimaryColumn({ name: 'Id_LoaiKhoi' })
  id: number;

  @Column({ name: 'TenLoaiKhoi' })
  tenloaikham?: string;
  


  @OneToMany(() => UserEntity, nhanvien => nhanvien.dmloaikhoi)
  nhanviens: UserEntity[]

}
