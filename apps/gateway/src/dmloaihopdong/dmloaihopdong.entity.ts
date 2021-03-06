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
import { NhanvienhopdongEntity } from '../nhanvienhopdong/nhanvienhopdong.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'loaihopdong' })
export class DmloaihopdongEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'ten_loai_hop_dong' })
  tenloaihopdong?: string;

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

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoitaoloaihopdong)
  @JoinColumn({ name: 'created_by' })
  nguoitao: UserEntity;

  @ManyToOne(() => UserEntity, (nhanvien) => nhanvien.nguoisualoaihopdong)
  @JoinColumn({ name: 'updated_by' })
  nguoisua: UserEntity;

  @OneToMany(
    () => NhanvienhopdongEntity,
    (nhanvienhopdong) => nhanvienhopdong.loaihopdong,
  )
  nhanvienhopdongs: NhanvienhopdongEntity[];
}
