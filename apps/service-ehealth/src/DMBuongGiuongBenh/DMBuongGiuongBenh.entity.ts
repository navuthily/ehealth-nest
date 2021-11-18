import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('GD2_DMBuong_GiuongBenh')
export class DMBuongGiuongBenhEntity {
  @PrimaryColumn({ name: 'ID_Buong_Giuong' })
  buongiuongId!: number;

  @Column({ name: 'TenBuong_Giuong' })
  tenbuongiuong!: string;
}
