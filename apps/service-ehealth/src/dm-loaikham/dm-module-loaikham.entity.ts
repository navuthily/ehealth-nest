import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { DMLoaiKhamEntity } from '../dm-loaikham/dm-loaikham.entity';

@Entity('DM_Module_LoaiKham')
export class DMModuleLoaiKhamEntity {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'ID_Module' })
  moduleId?: number;

  @Column({ name: 'ID_LoaiKham' })
  loaikhamId?: number;

  @Column({ name: 'TenLoaiKham' })
  tenloaikham?: string;

  // @ManyToMany(() => DMLoaiKhamEntity)
  // @JoinColumn({ name: 'ID_Module' })
  // dmLoaiKham: DMLoaiKhamEntity;

  // @Column({ name: 'TenLoaiKham' })
  // tenloaikham?: string;

  // @Column({ name: 'TenLoaiKham' })
  // tenloaikham?: string;

  // @Column({ name: 'TenLoaiKham' })
  // tenloaikham?: string;

  @ManyToOne(() => DMLoaiKhamEntity, { nullable: true })
  @JoinColumn({
    name: 'ID_LoaiKham'
  }) // Tên biến của entity module })
  dmLoaiKham: DMLoaiKhamEntity;

  // @OneToMany(
  //   () => BenhAnGiuongBenhEntity,
  //   (buonggiuongbenhs) => buonggiuongbenhs.thongtinluotkham,
  // )+
  // @JoinColumn({
  //   name: 'ID_LuotKham', // Tên cột trong db của entity module này
  //   referencedColumnName: 'luotkhamId', // Tên biến của entity module kia
  // })
  // buonggiuongbenhs: BenhAnGiuongBenhEntity[];
}
