// import { Content } from 'src/modules/contents/entities/content.entity';
import { AbstractUserEntity } from 'common/abstract-user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DMBenhNhanEntity } from '../dm-benhnhan/dm-benhnhan.entity';

@Entity('ThongTinLuotKham')
export class ThongTinLuotkham extends AbstractUserEntity {

  @ManyToOne(() => DMBenhNhanEntity, { cascade: true })
  @JoinColumn({ name: 'ID_BenhNhan' })
  dmBenhNhan: DMBenhNhanEntity;

  //   @Column({ nullable: true, name: 'ID_LuotKham' })
  //   luotkhamId?: number;

  @Column({ nullable: true, name: 'ID_BenhNhan' })
  benhnhanId?: number;

  @Column({ nullable: true, name: 'LoaiDoiTuongKham' })
  loaidoituongkham?: string;

  @Column({ nullable: true, name: 'ID_GoiKhamChoCongTy' })
  goikhamchocongtyId?: number;

  @Column({ nullable: true, name: 'ID_PhanLoaiKham' })
  phanloaikhamId?: number;

  @Column({ nullable: true, name: 'ThoiGianVaoKham' })
  thoigianvaokham?: Date;

  @Column({ nullable: true, name: 'ThoiGianKetThucKham' })
  thoigianketthuckham?: Date;

  @Column({ nullable: true, name: 'BSYeuCau' })
  bsyeucau?: number;

  @Column({ nullable: true, name: 'BSLamSang' })
  bslamsang?: number;

  @Column({ nullable: true, name: 'ThoiGianNhapVienBNNoiTru' })
  thoigiannhapvienBNNoiTru?: Date;

  @Column({ nullable: true, name: 'KhoaPhongBNNoiTru' })
  khoaphongBNNoiTru?: number;

  @Column({ nullable: true, name: 'SoGiuongBenhBNNoiTru' })
  sogiuongbenhBNNoiTru?: number;

  @Column({ nullable: true, name: 'ID_LichHen' })
  lichhenId?: number;

  @Column({ nullable: true, name: 'PhanLoai' })
  phanloai?: string;

  @Column({ nullable: true, name: 'SanSangGoiVaoKham' })
  sansanggoivaokham?: boolean;

  @Column({ nullable: true, name: 'HoanTatHoSo' })
  hoantatHoSo?: boolean;

  @Column({ nullable: true, name: 'ChoDeTraKetQua' })
  chodetraketqua?: boolean;

  @Column({ nullable: true, name: 'ID_NoiGioiThieu' })
  noigioithieuId?: number;

  @Column({ nullable: true, name: 'ID_HinhThucDen' })
  hinhthucdenId?: number;

  @Column({ nullable: true, name: 'NoiDungTaiKham' })
  noidungtaikham?: string;

  @Column({ nullable: true, name: 'DiemThaiDo' })
  diemthaido?: number;

  @Column({ nullable: true, name: 'DiemKinhTe' })
  diemkinhte?: number;

  @Column({ nullable: true, name: 'DiemHaiLong' })
  diemhailong?: number;

  @Column({ nullable: true, name: 'ID_BSChoDiem' })
  bschodiemId?: number;

  @Column({ nullable: true, name: 'ID_YTChoDiem' })
  ytchodiemId?: number;

  @Column({ nullable: true, name: 'NgayGioHenTraKQ' })
  ngaygiohentraKQ?: Date;

  @Column({ nullable: true, name: 'NgayGioTraKQ' })
  ngaygiotraKQ?: Date;

  @Column({ nullable: true, name: 'DaTraKQ' })
  datraKQ?: boolean;

  @Column({ nullable: true, name: 'LayDauHieuSinhTon' })
  laydauhieusinhton?: boolean;

  @Column({ nullable: true, name: 'BSKhamXong' })
  bskhamxong?: boolean;

  @Column({ nullable: true, name: 'ID_TrangThai' })
  trangthaiId?: string;

  @Column({ nullable: true, name: 'NgayHenTaiKham' })
  ngayhentaikham?: Date;

  @Column({ nullable: true, name: 'CoKhamLamSang' })
  cokhamlamsang?: boolean;

  @Column({ nullable: true, name: 'DaLapHoaDon' })
  dalapHoaDon?: boolean;

  @Column({ nullable: true, name: 'CoXacDinhNhanThan' })
  coxacdinhNhanThan?: boolean;

  @Column({ nullable: true, name: 'ID_LoaiKham' })
  loaikhamId?: number;

  @Column({ nullable: true, name: 'DaLuuHoSo' })
  daluuHoSo?: boolean;

  @Column({ nullable: true, name: 'ID_NguoiThucHien' })
  nguoithuchienId?: number;

  @Column({ nullable: true, name: 'NgayGioDuKienTraKQ' })
  ngaygioDuKienTraKQ?: Date;

  @Column({ nullable: true, name: 'ID_NguoiTraKQ' })
  nguoitraKQId?: number;

  @Column({ nullable: true, name: 'IsRenew' })
  renewId?: boolean;

  @Column({ nullable: true, name: 'ID_NguoiHenTraKQ' })
  nguoihentraKQId?: number;

  @Column({ nullable: true, name: 'ID_NguoiLayBenhPham' })
  nguoilayBenhPhamId?: number;

  @Column({ nullable: true, name: 'NgayGioLayBenhPham' })
  ngaygiolayBenhPham?: Date;

  @Column({ nullable: true, name: 'TrangThaiKham' })
  trangthaikham?: number;

  @Column({ nullable: true, name: 'ID_PhongKhamVatLy' })
  phongkhamvatlyId?: number;

  @Column({ nullable: true, name: 'ID_The' })
  theId?: number;

  @Column({ nullable: true, name: 'Chon' })
  chon?: boolean;

  @Column({ nullable: true, name: 'BSNVYC' })
  bsNVYC?: number;

  @Column({ nullable: true, name: 'DaThanhToanBill' })
  dathanhtoanBill?: boolean;

  @Column({ nullable: true, name: 'ID_TheBHCC' })
  theBHCCId?: number;

  @Column({ nullable: true, name: 'CreatOn' })
  createOn?: Date;

  @Column({ nullable: true, name: 'ID_Tang' })
  tangId?: number;

  @Column({ nullable: true, name: 'ID_NguoiHoanTatA' })
  nguoihoantatAId?: number;

  @Column({ nullable: true, name: 'ID_NguoiHoanTatB' })
  nguoihoantatBId?: number;

  @Column({ nullable: true, name: 'ID_NguoiHoanTatC' })
  nguoihoantatCId?: number;

  @Column({ nullable: true, name: 'ID_NguoiBaoLanhBHCC' })
  nguoibaolanhBHCCId?: number;

  @Column({ nullable: true, name: 'SoPhieuKhamGoiLoa' })
  sophieukhamGoiLoa?: string;

  @Column({ nullable: true, name: 'TongNgayDieuTri' })
  tongngayDieuTri?: number;

  @Column({ nullable: true, name: 'ID_ChuyenKhoa' })
  chuyenkhoaId?: number;

  @Column({ nullable: true, name: 'NgayGio_HoanTat' })
  ngaygioHoanTat?: Date;

  @Column({ nullable: true, name: 'ID_TrieuChung' })
  trieuchungId?: number;

  @Column({ nullable: true, name: 'MaBuuDien' })
  mabuudien?: string;

  @Column({ nullable: true, name: 'NgayGioNhap_MaBuuDien' })
  ngaygionhapMaBuuDien?: Date;

  @Column({ nullable: true, name: 'NguoiNhap_MaBuuDien' })
  nguoinhapMaBuuDien?: number;

  @Column({ nullable: true, name: 'ID_NguoiChot_KSKCTy' })
  nguoichotKSKCTyId?: number;

  @Column({ nullable: true, name: 'NgayChot_KSKCTy' })
  ngaychotKSKCTyId?: Date;

  @Column({ nullable: true, name: 'ID_The_Phu' })
  thephuId?: number;

  @Column({ nullable: true, name: 'ID_NguoiChotGiamGiaBHCC' })
  nguoichotGiamGiaBHCCId?: number;

  @Column({ nullable: true, name: 'Is_XuatThuoc' })
  isXuatThuoc?: boolean;

  @Column({ nullable: true, name: 'ID_NguoiKhoa_XuatThuoc' })
  nguoiKhoaXuatThuocId?: number;

  @Column({ nullable: true, name: 'ID_KhachSanLK' })
  khachsanLKId?: number;

  @Column({ nullable: true, name: 'ID_KhoaCap1' })
  khoacap1Id?: number;

  @Column({ nullable: true, name: 'NgayGioKhoaCap1' })
  ngaygioKhoaCap1?: Date;

  @Column({ nullable: true, name: 'ID_LuotKham_Cu' })
  luotkhamcuId?: number;

  @Column({ nullable: true, name: 'IsTaiNha' })
  isTaiNha?: boolean;

  @Column({ nullable: true, name: 'ID_Module' })
  moduleId?: number;
}
