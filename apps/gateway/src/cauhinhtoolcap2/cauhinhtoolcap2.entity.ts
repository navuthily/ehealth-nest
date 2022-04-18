import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LichSuChamDiemCap1 } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.entity';
import { CauHinhToolCap3Entity } from '../cauhinhtoolcap3/cauhinhtoolcap3.entity';
import { CauHinhToolCap1Entity } from '../cauhinhtoolcap1/cauhinhtoolcap1.entity';

@Entity({ name: 'Gd2_DA96_CauHinhTool_Cap2' })
export class CauHinhToolCap2Entity  {


  @PrimaryColumn({ name: 'ID_Cap2' })
  ID_Cap2: number;


  @Column({ name: 'ID_Cap1' })
  ID_Cap1?: number;

  @Column({ name: 'TenNhomDauVao' })
  TenNhomDauVao?: string;

  @Column({ name: 'SuDung' })
  SuDung?: Boolean;


  @OneToMany(() => CauHinhToolCap3Entity, cauhinhtoolcap3 => cauhinhtoolcap3.cauhinhtoolcap2)
  cauhinhtoolcap3s: CauHinhToolCap3Entity[] 


  @ManyToOne(() => CauHinhToolCap1Entity, cauhinhtoolcap1 => cauhinhtoolcap1.cauhinhtoolcap2s)
  @JoinColumn({ name: "ID_Cap1" })
  cauhinhtoolcap1: CauHinhToolCap1Entity

  


  // @OneToMany(() => LichSuChamDiemCap1, lichsuchamdiemcap1 => lichsuchamdiemcap1.cauhinhtoolcap1)
  // lichsuchamdiemcap1s: LichSuChamDiemCap1[]

}
