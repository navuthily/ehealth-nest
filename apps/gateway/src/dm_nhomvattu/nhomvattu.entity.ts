import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VatTu } from '../vattu/vattu.entity';

// @Entity('SV_FAMILY_.Pos$ph66_E')
@Entity({ name: 'dm_nhomvattu' })
export class NhomvattuEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: string;

  @Column({ name: 'nhom' })
  nhom?: string;

  @Column({ name: 'is_bhcc' })
  is_bhcc?: boolean;

  @OneToMany(() => VatTu, (vattu) => vattu.nhomvattu)
  vattus: VatTu[];
}
