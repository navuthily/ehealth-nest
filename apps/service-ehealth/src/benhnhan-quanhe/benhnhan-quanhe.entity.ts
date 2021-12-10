import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DMBenhNhanEntity } from '../dmbenhnhan/dmbenhnhan.entity';

@Entity('GD2_BenhNhan_QuanHe')
export class MoiQuanHeBenhNhanEntity {
  @PrimaryColumn({ name: 'ID_MoiQuanHe' })
  ID_MoiQuanHe!: number;

  @Column({ name: 'ID_BenhNhan' })
  ID_BenhNhan!: number;

  @Column({ name: 'ID_BenhNhan_QuanHe' })
  ID_BenhNhan_QuanHe!: number;

  @Column({ name: 'ID_LoaiQuanHe' })
  ID_LoaiQuanHe?: number;

  @Column({ name: 'HoLot_NguoiQuanHe' })
  HoLot_NguoiQuanHe?: string;

  @Column({ name: 'Ten_NguoiQuanHe' })
  Ten_NguoiQuanHe?: string;

  @Column({ name: 'SDT_NguoiQuanHe' })
  SDT_NguoiQuanHe?: string;

  @Column({ name: 'NamSinh_NguoiQuanHe', type: 'datetime2' })
  NamSinh_NguoiQuanHe?: Date;

  @Column({ name: 'NguoiTao' })
  NguoiTao?: number;

  @Column({ name: 'NguoiSua' })
  NguoiSua?: number;

  @Column({ name: 'DiaChi_NguoiLienHe' })
  DiaChi_NguoiLienHe?: string;

  @Column({ name: 'is_daidien' })
  is_daidien?: boolean;

  @ManyToOne(() => DMBenhNhanEntity)
  @JoinColumn({ name: 'ID_BenhNhan', referencedColumnName: 'benhnhanId' })
  dmbenhnhan: DMBenhNhanEntity;

  // @ManyToOne(() => ThongTinBenhVienEntity)
  // @JoinColumn({ name: 'Id_BenhVien', referencedColumnName: 'Id_BenhVien' })
  // thongtinbenhvien: ThongTinBenhVienEntity;
}
