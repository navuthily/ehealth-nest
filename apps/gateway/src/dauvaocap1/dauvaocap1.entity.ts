import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LichSuChamDiemCap2Entity } from '../LichSuChamDiemCap2/lichsuchamdiemcap2.entity';
import { CauHinhToolCap2Entity } from '../cauhinhtoolcap2/cauhinhtoolcap2.entity';
import { CauHinhToolCap3Entity } from '../cauhinhtoolcap3/cauhinhtoolcap3.entity';
import { DauVaoCap2Entity } from '../dauvaocap2/dauvaocap2.entity';
import { DanhMucLoaiDinhNghiaEntity } from '../danhmucloaidinhnghia/danhmucloaidinhnghia.entity';

@Entity({ name: 'Gd2_DA96_DauVao_Cap1' })
export class DauVaoCap1Entity  {


  @PrimaryColumn({ name: 'ID_LoaiDauVao_Cap1' })
  id: number;


  @Column({ name: 'TenLoaiDauVao' })
  TenLoaiDauVao?: number;

  @Column({ name: 'LoaiDinhNghia' })
  LoaiDinhNghia?: number;




  @OneToMany(() => CauHinhToolCap3Entity, cauhinhtoolcap3 => cauhinhtoolcap3.dauvaocap1)
  cauhinhtoolcap3s: CauHinhToolCap3Entity[]


  @OneToMany(() => DauVaoCap2Entity, dauvaocap2 => dauvaocap2.dauvaocap1)
  dauvaocap2s: DauVaoCap2Entity[]



  @ManyToOne(() => DanhMucLoaiDinhNghiaEntity, danhmucloaidinhnghia => danhmucloaidinhnghia.dauvaocap1s)
  @JoinColumn({ name: "LoaiDinhNghia" })
  danhmucloaidinhnghia: DanhMucLoaiDinhNghiaEntity


  

}
