import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LichSuChamDiemCap2Entity } from '../LichSuChamDiemCap2/lichsuchamdiemcap2.entity';
import { CauHinhToolCap2Entity } from '../cauhinhtoolcap2/cauhinhtoolcap2.entity';
import { DauVaoCap1Entity } from '../dauvaocap1/dauvaocap1.entity';

@Entity({ name: 'Gd2_DA96_CauHinhTool_Cap3' })
export class CauHinhToolCap3Entity  {


  @PrimaryColumn({ name: 'ID_Cap3' })
  ID_Cap3: number;


  @Column({ name: 'ID_Cap2' })
  ID_Cap2?: number;

  @Column({ name: 'ID_LoaiDauVao_Cap1' })
  ID_LoaiDauVao_Cap1?: number;


  
  @Column({ name: 'Diem' })
  Diem?: number;

  @Column({ name: 'SuDungC3' })
  SuDungC3?: Boolean;
  
  @Column({ name: 'GhiChu' })
  GhiChu?: string;



  @Column({ name: 'TenCauHinhCuThe' })
  tencauhinhcuthe?: string;

  @Column({ name: 'Max' })
  max?: number;

  @Column({ name: 'Min' })
  min?: number;












  // @OneToMany(() => LichSuChamDiemCap2Entity, lichsuchamdiemcap2 => lichsuchamdiemcap2.cauhinhtoolcap3)
  // lichsuchamdiemcap2s: LichSuChamDiemCap2Entity[]


  @ManyToOne(() => CauHinhToolCap2Entity, cauhinhtoolcap2 => cauhinhtoolcap2.cauhinhtoolcap3s)
  @JoinColumn({ name: "ID_Cap2" })
  cauhinhtoolcap2: CauHinhToolCap2Entity

  @ManyToOne(() => DauVaoCap1Entity, dauvaocap1 => dauvaocap1.cauhinhtoolcap3s)
  @JoinColumn({ name: "ID_LoaiDauVao_Cap1" })
  dauvaocap1: DauVaoCap1Entity
  


  // @OneToMany(() => LichSuChamDiemCap1, lichsuchamdiemcap1 => lichsuchamdiemcap1.cauhinhtoolcap1)
  // lichsuchamdiemcap1s: LichSuChamDiemCap1[]

}
