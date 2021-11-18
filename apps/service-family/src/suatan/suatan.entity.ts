import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { SuatAnChiTietEntity } from '../suatanchitiet/suatanchitiet.entity';

@Entity('Pos$ph66_EH')
export class SuatAnEntity {
  @PrimaryColumn({ name: 'Id_Phieu' })
  phieuId!: number;

  @Column({ name: 'Id_LuotKham' })
  luotkhamId!: number;

  @Column({ name: 'Id_BenhNhan' })
  benhnhanId!: number;

  @Column({ name: 'Id_Buoi' })
  buoiId!: number;

  buoi?: string;

  @Column({ name: 'Diengiai' })
  diengiai?: string;

  @Column({ name: 'NgayGioDuyet', type: 'datetime2' })
  ngaygioduyet?: Date;

  @OneToMany(() => SuatAnChiTietEntity, (suatanchitiet) => suatanchitiet.suatan)
  @JoinColumn({ name: 'Id_Phieu', referencedColumnName: 'Id_Phieu' })
  suatanchitiets: SuatAnChiTietEntity[];

  @AfterLoad()
  afterLoad() {
    const buoi = {
      1: 'Sáng',
      2: 'Trưa',
      3: 'Chiều',
      4: 'Tối'
    };
    this.buoi = buoi[this.buoiId]?buoi[this.buoiId]:'';
  }
}
