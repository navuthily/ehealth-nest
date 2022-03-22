import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LichSuChamDiemCap2Entity } from '../LichSuChamDiemCap2/lichsuchamdiemcap2.entity';
import { CauHinhToolCap2Entity } from '../cauhinhtoolcap2/cauhinhtoolcap2.entity';
import { CauHinhToolCap3Entity } from '../cauhinhtoolcap3/cauhinhtoolcap3.entity';
import { DauVaoCap1Entity } from '../dauvaocap1/dauvaocap1.entity';
import { DauVaoCap3Entity } from '../dauvaocap3/dauvaocap3.entity';

@Entity({ name: 'Gd2_DA96_DauVao_Cap2' })
export class DauVaoCap2Entity  {


  @PrimaryColumn({ name: 'ID_Cap2' })
  id: number;


  @Column({ name: 'ID_Cap1' })
  ID_Cap1?: number;

  @Column({ name: 'ID_LoaiKham' })
  ID_LoaiKham?: number;


  @ManyToOne(() => DauVaoCap1Entity, dauvaocap1 => dauvaocap1.dauvaocap2s)
  @JoinColumn({ name: "ID_Cap1" })
  dauvaocap1: DauVaoCap1Entity

  @OneToMany(() => DauVaoCap3Entity, dauvaocap3 => dauvaocap3.dauvaocap2)
  dauvaocap3s: DauVaoCap3Entity[]


//   @ManyToOne(() => CauHinhToolCap2Entity, cauhinhtoolcap2 => cauhinhtoolcap2.cauhinhtoolcap3s)
//   @JoinColumn({ name: "ID_Cap2" })
//   cauhinhtoolcap2: CauHinhToolCap2Entity


  

}
