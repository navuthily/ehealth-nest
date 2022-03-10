import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { DmloaihopdongEntity } from '../dmloaihopdong/dmloaihopdong.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_NhanVien_HopDong' })
export class NhanvienhopdongEntity  {


  @PrimaryColumn({ name: 'ID_auto' })
  id: number;

  @Column({ name: 'ID_NhanVien' })
  idnhanvien: number;
  @Column({ name: 'ID_LoaiHopDong' })
  idloaihopdong: number;
  
  @ManyToOne(() => UserEntity, nhanvien => nhanvien.nhanvienhopdongs)
  @JoinColumn({ name: "ID_NhanVien" })
  nhanvien:UserEntity

  @ManyToOne(() => DmloaihopdongEntity, loaihopdong => loaihopdong.nhanvienhopdongs)
  @JoinColumn({ name: "ID_LoaiHopDong" })
  loaihopdong:DmloaihopdongEntity
}
