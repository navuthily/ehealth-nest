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

  
  @Column({nullable:true, name: 'nhanvien_id' })
  nhanvienId: number;


  @Column({nullable:true, name: 'ID_LoaiHopDong' })
  loaihopdongId: number;
  @Column({nullable:true, name: 'noidung' })
  noidunghopdong?: string;
  @Column({nullable:true, name: 'NgayBatDau' })
  ngaybatdau: Date;

  @Column({ nullable:true,name: 'NgayKetThuc' })
  ngayketthuc: Date;

  @Column({ nullable:true,name: 'Ghichu' })
  ghichu: string;

  @Column({nullable:true, name: 'created_by' })
  createdBy?: number;
  @Column({nullable:true, name: 'updated_by' })
  updatedBy?: number;
  @Column({nullable:true, name: 'created_at' })
  createdAt?: Date;
  @Column({nullable:true, name: 'updated_at' })
  updatedAt?: Date;
  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nhanvienhopdongs)
  @JoinColumn({ name: 'created_by' })
  nguoitao: UserEntity;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nhanvienhopdong)
  @JoinColumn({ name: 'updated_by' })
  nguoisua: UserEntity;


  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nhanvienhd)
  @JoinColumn({ name: 'nhanvienId' })
  nhanvien: UserEntity;

  @ManyToOne(
    () => DmloaihopdongEntity,
    (loaihopdong) => loaihopdong.nhanvienhopdongs,
  )
  @JoinColumn({ name: 'ID_LoaiHopDong' })
  loaihopdong: DmloaihopdongEntity;
}
