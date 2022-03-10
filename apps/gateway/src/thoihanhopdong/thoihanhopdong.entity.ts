import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_DM_ThoiHanHopDong' })
export class ThoihanhopdongEntity  {


  @PrimaryColumn({ name: 'Id_ThoiHanHopDong' })
  id: number;

  @Column({ name: 'TenLoaiThoiHan' })
  tenthoihanhopdong?: string;
  

  @OneToMany(() => UserEntity, nhanvien => nhanvien.thoihanhopdong)
  nhanviens: UserEntity[]

}
