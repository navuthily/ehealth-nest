import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DauVaoCap2Entity } from '../dauvaocap2/dauvaocap2.entity';


@Entity({ name: 'Gd2_DA96_DauVao_Cap3' })
export class DauVaoCap3Entity  {


  @PrimaryColumn({ name: 'ID_Cap3' })
  id: number;


  @Column({ name: 'ID_Cap2' })
  ID_Cap2?: number;

  @Column({ name: 'ID_ChiMucCon' })
  ID_ChiMucCon?: number;


  @ManyToOne(() => DauVaoCap2Entity, dauvaocap2 => dauvaocap2.dauvaocap3s)
  @JoinColumn({ name: "ID_Cap2" })
  dauvaocap2: DauVaoCap2Entity

  

  // @OneToMany(() => CauHinhToolCap3Entity, cauhinhtoolcap3 => cauhinhtoolcap3.dauvaocap1)
  // cauhinhtoolcap3s: CauHinhToolCap3Entity[]


//   @ManyToOne(() => CauHinhToolCap2Entity, cauhinhtoolcap2 => cauhinhtoolcap2.cauhinhtoolcap3s)
//   @JoinColumn({ name: "ID_Cap2" })
//   cauhinhtoolcap2: CauHinhToolCap2Entity


  

}
