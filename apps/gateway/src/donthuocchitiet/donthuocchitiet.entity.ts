import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { DonthuocEntity } from '../donthuoc/donthuoc.entity';
import { DMThuocEntity } from '../thuoc/thuoc.entity';


@Entity({ name: 'DonThuocChiTiet' })
export class DonthuocchitietEntity  {


  @PrimaryGeneratedColumn({ name: 'ID_DonThuocCT' })
  id: number;

  @Column({ name: 'ID_DonThuoc' })
  id_donthuoc?: number;
  

  @Column({ name: 'ID_Thuoc' })
  id_thuoc?: number;

  
  @Column({ name: 'SoThuocThucXuat' })
  sothuocthucxuat?: number;

  
  @Column({ name: 'GhiChu' })
  ghichu?: number;

  
  @Column({ name: 'CachDung' })
  cachdung?: string;

  
  @Column({ name: 'LuongThuocDungTrong1Ngay' })
  luongthuocdungtrong1ngay?: number;

  
  @Column({ name: 'CachDungLieuDung' })
  cachdunglieudung?: number;

  @ManyToOne(() => DonthuocEntity, donthuoc => donthuoc.donthuocchitiets)
  @JoinColumn({ name: "id_donthuoc" })
  donthuoc: DonthuocEntity


  @ManyToOne(() => DMThuocEntity, dmthuoc => dmthuoc.donthuocchitiets)
  @JoinColumn({ name: "id_thuoc" })
  dmthuoc: DMThuocEntity

  // @OneToMany(() => UserEntity, nhanvien => nhanvien.chucvu)
  // nhanviens: UserEntity[]

}
