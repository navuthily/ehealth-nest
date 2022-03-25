import { Column, Entity, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LichSuChamDiemCap1 } from '../LichSuChamDiemCap1/lichsuchamdiemcap1.entity';
import { CauHinhToolCap3Entity } from '../cauhinhtoolcap3/cauhinhtoolcap3.entity';
import { CauHinhToolCap1Entity } from '../cauhinhtoolcap1/cauhinhtoolcap1.entity';
import { ToDieuTriEntity } from '../todieutri/todieutri.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'GD2_ToDieuTriChiTiet' })
export class ToDieuTriChiTietEntity  {


  @PrimaryColumn({ name: 'ID_ToDieuTriChiTiet' })
  id: number;


  @Column({ name: 'ID_ToDieuTri' })
  id_todieutri?: number;

  @Column({ name: 'ID_DonThuoc' })
  id_donthuoc?: number;

  @Column({ name: 'ID_DonThuocTraLai' })
  id_donthuoctralai?: number;

  @Column({ name: 'ID_DM_LoaiChamSoc' })
  id_loaichamsoc?: number;
  
  

  @Column({ name: 'ID_NguoiHoanTat' })
  id_nguoihoantat?: number;


  @Column({ name: 'DienBien' })
  dienbien?: string;


  @ManyToOne(() => ToDieuTriEntity, todieutri => todieutri.todieutrichitiets)
  @JoinColumn({ name: "ID_ToDieuTri" })
  todieutri: ToDieuTriEntity

  @ManyToOne(() => UserEntity, nhanvien => nhanvien.todieutrichitiets)
  @JoinColumn({ name: "ID_NguoiHoanTat" })
  nhanvien: UserEntity


  // @OneToMany(() => LichSuChamDiemCap1, lichsuchamdiemcap1 => lichsuchamdiemcap1.cauhinhtoolcap1)
  // lichsuchamdiemcap1s: LichSuChamDiemCap1[]

}
