import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { LichSuChamDiemCap1 } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.entity';

@Entity({ name: 'Gd2_DA96_CauHinhTool_Cap1' })
export class CauHinhToolCap1Entity  {


  @PrimaryColumn({ name: 'ID_Cap1' })
  ID_Cap1: number;


  @Column({ name: 'TenTool' })
  TenTool?: string;

  @Column({ name: 'ID_LoaiTool' })
  ID_LoaiTool?: number;








  


  // @OneToMany(() => LichSuChamDiemCap1, lichsuchamdiemcap1 => lichsuchamdiemcap1.cauhinhtoolcap1)
  // lichsuchamdiemcap1s: LichSuChamDiemCap1[]

}
