// import { Content } from 'src/modules/contents/entities/content.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DMBenhNhan } from '../dm_benhnhan/dm_benhnhan.entity';

@Entity('ThongTinLuotKham')
export class ThongTinLuotkham {
  @PrimaryGeneratedColumn({ name: 'ID_LuotKham' })
  id: number;

  @Column({ name: 'ID_BenhNhan' })
  idBenhNhan: number;

  @Column({ name: 'ThoiGianVaoKham' })
  thoiGianVaoKham: Date;

  @ManyToOne(() => DMBenhNhan, { cascade: true })
  @JoinColumn({ name: 'ID_BenhNhan' })
  dmBenhNhan: DMBenhNhan;
}
