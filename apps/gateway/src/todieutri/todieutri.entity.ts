import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LichSuChamDiemCap1 } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.entity';
import { CauHinhToolCap3Entity } from '../cauhinhtoolcap3/cauhinhtoolcap3.entity';
import { CauHinhToolCap1Entity } from '../cauhinhtoolcap1/cauhinhtoolcap1.entity';
import { ToDieuTriChiTietEntity } from '../todieutrichitiet/todieutrichitiet.entity';

@Entity({ name: 'GD2_TODIEUTRI' })
export class ToDieuTriEntity  {


  @PrimaryColumn({ name: 'ID_ToDieuTri' })
  id: number;


  @Column({ name: 'SoToDieuTri' })
  SoToDieuTri?: number;

  @Column({ name: 'ID_BenhAnNoiTru' })
  ID_BenhAnNoiTru?: number;

  @Column({ name: 'ChanDoan' })
  ChanDoan?: string;

  @Column({ name: 'NguoiTao' })
  NguoiTao?: number;
  


  @Column({ name: 'ID_ToDieuTri_Cu' })
  ID_ToDieuTri_Cu?: string;


  


  @OneToMany(() => ToDieuTriChiTietEntity, todieutrichitiet => todieutrichitiet.todieutri)
  todieutrichitiets: ToDieuTriChiTietEntity[]

}
