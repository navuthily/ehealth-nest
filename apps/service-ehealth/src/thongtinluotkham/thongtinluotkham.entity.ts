import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { BenhAnGiuongBenhEntity } from '../BenhAnGiuongBenh/BenhAnGiuongBenh.entity';
import { DMBenhNhanEntity } from '../dmbenhnhan/dmbenhnhan.entity';

@Entity('ThongTinLuotKham')
export class ThongTinLuotKhamEntity {
  @PrimaryColumn({ name: 'ID_LuotKham' })
  luotkhamId!: number;

  @Column({ name: 'ID_BenhNhan' })
  benhnhanId!: number;

  @ManyToOne(() => DMBenhNhanEntity)
  @JoinColumn({ name: 'ID_BenhNhan' })
  dmBenhNhan: DMBenhNhanEntity;

  @OneToMany(
    () => BenhAnGiuongBenhEntity,
    (buonggiuongbenhs) => buonggiuongbenhs.thongtinluotkham,
  )
  @JoinColumn({
    name: 'ID_LuotKham', // Tên cột trong db của entity module này
    referencedColumnName: 'luotkhamId', // Tên biến của entity module kia
  })
  buonggiuongbenhs: BenhAnGiuongBenhEntity[];
}
