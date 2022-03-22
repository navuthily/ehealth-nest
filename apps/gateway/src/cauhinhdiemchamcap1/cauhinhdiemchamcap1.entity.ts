import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CauHinhDiemChamCap2Entity } from '../cauhinhdiemchamcap2/cauhinhdiemchamcap2.entity';

@Entity({ name: 'Gd2_DA96_CauHinh_DiemCham_Cap1' })
export class CauHinhDiemChamCap1Entity  {


  @PrimaryColumn({ name: 'ID_DiemCap1' })
  ID_DiemCap1: number;


  @Column({ name: 'ID_Tool' })
  ID_Tool?: number;


  @Column({ name: 'SuDung' })
  SuDung?: number;




  @OneToMany(() => CauHinhDiemChamCap2Entity, cauhinhdiemchamcap2 => cauhinhdiemchamcap2.cauhinhdiemchamcap1)
  cauhinhdiemchamcap2s: CauHinhDiemChamCap2Entity[]







  



}
