import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { LichSuChamDiemCap1 } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.entity';
import { CauHinhToolCap2Entity } from '../cauhinhtoolcap2/cauhinhtoolcap2.entity';

@Entity({ name: 'Gd2_DA96_CauHinhTool_Cap1' })
export class CauHinhToolCap1Entity  {


  @PrimaryColumn({ name: 'ID_Cap1' })
  id: number;


  @Column({ name: 'TenTool' })
  TenTool?: string;

  @Column({ name: 'ID_LoaiTool' })
  ID_LoaiTool?: number;


  @Column({ name: 'SuDung' })
  SuDung?: Boolean;

  @OneToMany(() => CauHinhToolCap2Entity, cauhinhtoolcap2 => cauhinhtoolcap2.cauhinhtoolcap1)
  cauhinhtoolcap2s: CauHinhToolCap2Entity[]





  


  @OneToMany(() => LichSuChamDiemCap1, lichsuchamdiemcap1 => lichsuchamdiemcap1.cauhinhtoolcap1)
  lichsuchamdiemcap1s: LichSuChamDiemCap1[]

}
