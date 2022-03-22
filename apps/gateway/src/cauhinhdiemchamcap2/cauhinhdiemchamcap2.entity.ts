import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LichSuChamDiemCap1 } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.entity';
import { CauHinhDiemChamCap1Entity } from '../cauhinhdiemchamcap1/cauhinhdiemchamcap1.entity';

@Entity({ name: 'Gd2_DA96_CauHinh_DiemCham_Cap2' })
export class CauHinhDiemChamCap2Entity  {


  @PrimaryColumn({ name: 'ID_AutoCap2' })
  ID_AutoCap2: number;


  @Column({ name: 'ID_AutoCap1' })
  ID_AutoCap1?: number;

  @Column({ name: 'Diem' })
  Diem?: number;



  @ManyToOne(() => CauHinhDiemChamCap1Entity, cauhinhdiemchamcap1 => cauhinhdiemchamcap1.cauhinhdiemchamcap2s)
  @JoinColumn({ name: "ID_AutoCap1" })
  cauhinhdiemchamcap1: CauHinhDiemChamCap1Entity







  


//   @OneToMany(() => LichSuChamDiemCap1, lichsuchamdiemcap1 => lichsuchamdiemcap1.cauhinhtoolcap1)
//   lichsuchamdiemcap1s: LichSuChamDiemCap1[]

}
