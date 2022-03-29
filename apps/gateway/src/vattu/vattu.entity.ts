import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
