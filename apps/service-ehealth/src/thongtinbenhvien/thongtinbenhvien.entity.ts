import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DMLoaiKhamEntity } from '../dm-loaikham/dm-loaikham.entity';

@Entity('GD2_ThongTinBenhVien')
export class ThongTinBenhVienEntity {
  @PrimaryColumn({ name: 'Id_BenhVien' })
  Id_BenhVien!: number;

  @Column({ name: 'TenBenhVien' })
  TenBenhVien?: string;

}
