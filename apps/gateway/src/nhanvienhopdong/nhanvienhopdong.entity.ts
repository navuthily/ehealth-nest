import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DmloaihopdongEntity } from '../dmloaihopdong/dmloaihopdong.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_NhanVien_HopDong' })
export class NhanvienhopdongEntity {
  @PrimaryGeneratedColumn({ name: 'ID_auto' })
  id: number;

  @Column({ name: 'ID_NhanVien' })
  nhanvienId: number;
  @Column({ name: 'ID_LoaiHopDong' })
  loaihopdongId: number;
  //
  @Column({ name: 'noidung' })
  noidunghopdong: string;
  @Column({ name: 'NgayBatDau' })
  ngaybatdau: Date;

  @Column({ name: 'NgayKetThuc' })
  ngayketthuc: Date;

  @Column({ name: 'Ghichu' })
  ghichu: string;

  @Column({ name: 'created_by' })
  createdBy?: number;
  @Column({ name: 'updated_by' })
  updatedBy?: number;
  @Column({ name: 'created_at' })
  createdAt?: Date;
  @Column({ name: 'updated_at' })
  updatedAt?: Date;
  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nhanvienhopdongs)
  @JoinColumn({ name: 'created_by' })
  nguoitao: UserEntity;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nhanvienhopdong)
  @JoinColumn({ name: 'updated_by' })
  nguoisua: UserEntity;
  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nhanvienhd)
  @JoinColumn({ name: 'ID_NhanVien' })
  nhanvien: UserEntity;

  @ManyToOne(
    () => DmloaihopdongEntity,
    (loaihopdong) => loaihopdong.nhanvienhopdongs,
  )
  @JoinColumn({ name: 'ID_LoaiHopDong' })
  loaihopdong: DmloaihopdongEntity;
}
