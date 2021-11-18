import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DMVatTuEntity } from '../dmvt2/dmvt2.entity';
import { SuatAnEntity } from '../suatan/suatan.entity';

@Entity('Pos$ct66_EH')
export class SuatAnChiTietEntity {
  @PrimaryColumn({ name: 'Id_auto' })
  id!: number;

  @Column({ name: 'ID_phieu' })
  phieuId!: number;

  @Column({ name: 'So_luong' })
  soluong?: number;

  @Column({ name: 'Gia' })
  gia?: number;

  @Column({ name: 'Thanhtien' })
  thanhtien?: number;

  @ManyToOne(() => SuatAnEntity)
  @JoinColumn({ name: 'ID_phieu' })
  suatan: SuatAnEntity;

  @ManyToOne(() => DMVatTuEntity)
  @JoinColumn({ name: 'Ma_vt' })
  vattu: DMVatTuEntity;
}
