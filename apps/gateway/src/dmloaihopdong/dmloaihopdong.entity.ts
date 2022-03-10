import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { NhanvienhopdongEntity } from '../nhanvienhopdong/nhanvienhopdong.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_DM_LoaiHopDong' })
export class DmloaihopdongEntity  {


  @PrimaryColumn({ name: 'ID_LoaiHopDong' })
  id: number;

  @Column({ name: 'TenLoaiHopDong' })
  tenloaihopdong?: string;
  

  @Column({ name: 'Active' })
  active?: number;

  @OneToMany(() => NhanvienhopdongEntity, nhanvienhopdong => nhanvienhopdong.loaihopdong)
  nhanvienhopdongs:  NhanvienhopdongEntity[]

}
