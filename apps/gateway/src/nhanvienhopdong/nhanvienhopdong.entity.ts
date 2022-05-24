import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DmloaihopdongEntity } from '../dmloaihopdong/dmloaihopdong.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'nhanvienhopdong' })
export class NhanvienhopdongEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: true, name: 'nhanvien_id' })
  nhanvienId: number;

  @Column({ nullable: true, name: 'loai_hop_dong_id' })
  loaihopdongId: number;
  @Column({
    nullable: true,
    name: 'noi_dung',
    type: 'varchar',
    length: '65535',
  })
  noidunghopdong?: string;
  @Column({ nullable: true, name: 'ngay_bat_dau' })
  ngaybatdauhopdong: Date;

  @Column({ nullable: true, name: 'ngay_ket_thuc' })
  ngayketthuchopdong: Date;
  @Column({ nullable: true, name: 'ghi_chu' })
  ghichu: string;

  @Column({ nullable: true, name: 'created_by' })
  createdBy?: number;

  @Column({ nullable: true, name: 'updated_by' })
  updatedBy?: number;

  @CreateDateColumn({
    nullable: true,
    name: 'created_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'updated_at',
  })
  updatedAt?: Date;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nhanvienhopdongs)
  @JoinColumn({ name: 'created_by' })
  nguoitao: UserEntity;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nhanvienhopdong)
  @JoinColumn({ name: 'updated_by' })
  nguoisua: UserEntity;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nhanvienhd)
  @JoinColumn({ name: 'nhanvien_id' })
  nhanvien: UserEntity;

  @ManyToOne(
    () => DmloaihopdongEntity,
    (loaihopdong) => loaihopdong.nhanvienhopdongs,
  )
  @JoinColumn({ name: 'loai_hop_dong_id' })
  loaihopdong: DmloaihopdongEntity;
}
