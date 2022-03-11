import { Column, Entity, OneToMany, PrimaryColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { LichSuChamDiemCap1 } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.entity';


@Entity({ name: 'Gd2_DA96_DinhNghia_Loai_CongThuc' })
export class DinhNghiaLoaiCongThucEntity  {


  @PrimaryColumn({ name: 'ID_Loai' })
  ID_Loai: number;


  @Column({ name: 'TenLoai' })
  TenLoai?: string;






  @OneToMany(() => LichSuChamDiemCap1, lichsuchamdiemcap1 => lichsuchamdiemcap1.dinhnghialoaicongthuc)
  lichsuchamdiemcap1s: LichSuChamDiemCap1[]


  
}
