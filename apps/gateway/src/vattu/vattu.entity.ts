import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { NhomvattuEntity } from '../dm_nhomvattu/nhomvattu.entity';

// @Entity('SV_FAMILY_.Pos$ph66_E')
@Entity({ name: 'dmvt2' })
export class VatTu {
  @PrimaryColumn({ name: 'Ma_vt' })
  Ma_vt?: string;

  @Column({ name: 'So_tt' })
  So_tt?: string;

  @Column({ name: 'Barcode' })
  Barcode?: string;

  @Column({ name: 'Ten_vt' })
  Ten_vt?: string;

  @Column({ name: 'Dvt' })
  Dvt?: string;

  @Column({ name: 'id_dm_nhomvattu' })
  id_dm_nhomvattu?: number;

  @ManyToOne(() => NhomvattuEntity, (nhomvattu) => nhomvattu.vattus)
  @JoinColumn({ name: "id_dm_nhomvattu" })
  nhomvattu: NhomvattuEntity
}
