import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

@Entity('ThongTinLuotKham')
export class ThongTinLuotKhamEntity {
  @PrimaryColumn({ name: 'ID_LuotKham' })
  luotkhamId: number;

  @Column({ name: 'ThoiGianVaoKham' })
  thoigianvaokham: Date;

  @Column({ name: 'ID_BenhNhan' })
  benhnhanId: number;

  @Column({ name: 'BSYeuCau' })
  bsyeucau: number;

  @Column({ name: 'PhanLoai' })
  phanloai: number;
}
