import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { SuatAnChiTietEntity } from '../suatanchitiet/suatanchitiet.entity';

@Entity('dmvt2')
export class DMVatTuEntity {
  @PrimaryColumn({ name: 'Ma_vt' })
  maVT!: number;

  @Column({ name: 'Ten_vt' })
  tenVT!: string;

  @Column({ name: 'So_tt' })
  soTT?: number;

//   @OneToMany(() => SuatAnChiTietEntity, (suatanchitiet) => suatanchitiet.vattu)
//   @JoinColumn({ name: 'Id_Phieu', referencedColumnName: 'Id_Phieu' })
//   suatanchitiets: SuatAnChiTietEntity[];
}
