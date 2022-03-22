import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DauVaoCap2Entity } from '../dauvaocap2/dauvaocap2.entity';
import { DauVaoCap1Entity } from '../dauvaocap1/dauvaocap1.entity';


@Entity({ name: 'Gd2_DA96_DanhMucLoaiDinhNghia' })
export class DanhMucLoaiDinhNghiaEntity  {


  @PrimaryColumn({ name: 'ID_LoaiDinhNghia' })
  id: number;


  @Column({ name: 'TenDinhNghia' })
  TenDinhNghia?: string;





  @OneToMany(() => DauVaoCap1Entity, dauvaocap1 => dauvaocap1.danhmucloaidinhnghia)
  dauvaocap1s: DauVaoCap1Entity[]


//   @ManyToOne(() => CauHinhToolCap2Entity, cauhinhtoolcap2 => cauhinhtoolcap2.cauhinhtoolcap3s)
//   @JoinColumn({ name: "ID_Cap2" })
//   cauhinhtoolcap2: CauHinhToolCap2Entity


  

}
