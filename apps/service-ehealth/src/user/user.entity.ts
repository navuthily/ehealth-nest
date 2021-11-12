import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '@libs/common/abstract.entity';
import { UseDto } from '@libs/decorators/use-dto.decorator';
import type { UserDtoOptions } from './dto/user-dto';
import { UserDto } from './dto/user-dto';

@Entity({ name: 'DM_NhanVien' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto, UserDtoOptions> {
    @Column({ name: 'ID_NhanVien' })
    nhanvienId?: number;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ nullable: true, name: 'MaNV' })
  maNhanVien?: string;

  @Column({ nullable: true, name: 'ID_DonVi' })
  donviId?: number;

  @Column({ nullable: true, name: 'ID_BoPhan' })
  bophanId?: number;

  @Column({ nullable: true, name: 'ID_PhongBan' })
  phongbanId?: number;

  @Column({ nullable: true, name: 'HoLotNhanVien' })
  holotNhanVien?: string;

  @Column({ nullable: true, name: 'TenNhanVien' })
  tennhanvien?: string;

  @Column({ nullable: true, name: 'HinhNhanVien' })
  hinhNhanVien?: string;

  @Column({ nullable: true, name: 'GioiTinh' })
  gioitinh?: boolean;

  @Column({ nullable: true, name: 'ID_DanToc' })
  dantocId?: number;

  @Column({ nullable: true, name: 'ID_QuocTich' })
  quoctichId?: number;

  @Column({ nullable: true, name: 'CMND' })
  cmnd?: string;

  @Column({ nullable: true, name: 'HoChieu' })
  hochieu?: string;

  @Column({ nullable: true, name: 'ID_ChucVu' })
  chucvuId?: number;

  @Column({ nullable: true, name: 'ID_ChucDanh' })
  chucdanhId?: number;

  @Column({ nullable: true, name: 'DiaChi' })
  diachi?: string;

  @Column({ nullable: true, name: 'Mobile' })
  mobile?: string;

  @Column({ nullable: true, name: 'HomePhone' })
  homePhone?: string;

  @Column({ nullable: true, name: 'Email' })
  email?: string;

  @Column({ nullable: true, name: 'YahooID' })
  yahooId?: string;

  @Column({ nullable: true, name: 'SkypeID' })
  skypeId?: string;

  @Column({ nullable: true, name: 'NgaySinh' })
  ngaysinh?: Date;

  @Column({ nullable: true, name: 'NgayVaoLam' })
  ngayvaolam?: Date;

  @Column({ nullable: true, name: 'ID_TrinhDo' })
  trinhdoId?: number;

  @Column({ nullable: true, name: 'ID_LoaiTinhLuong' })
  loaitinhluongId?: number;

  @Column({ nullable: true, name: 'ChamCongBangMay' })
  chamcongbangmay?: boolean;

  @Column({ nullable: true, name: 'TaiKhoanNH' })
  taikhoanNganHang?: string;

  @Column({ nullable: true, name: 'ID_NganHang' })
  nganhangId?: number;

  @Column({ nullable: true, name: 'MaSoThueCaNhan' })
  masothuecanhan?: string;

  @Column({ nullable: true, name: 'SoBaoHiem' })
  sobaohiem?: string;

  @Column({ nullable: true, name: 'GhiChu' })
  ghichu?: string;

  @Column({ nullable: true, name: 'DaNghiViec' })
  danghiviec?: boolean;

  @Column({ nullable: true, name: 'HinhChuKy' })
  hinhchuky?: string;

  @Column({ nullable: true, name: 'IsDoctor' })
  isDoctor?: boolean;

  @Column({ nullable: true, name: 'IsCTVBenNgoai' })
  isCongTacVienBenNgoai?: boolean;

  @Column({ nullable: true, name: 'AllowLogin' })
  allowLogin?: boolean;

  @Column({ nullable: true, name: 'NickName' })
  nickname?: string;

  @Column({ nullable: true, name: 'ExtField1' })
  extfield1?: boolean;

  @Column({ nullable: true, name: 'ExtField2' })
  extfield2?: boolean;

  @Column({ nullable: true, name: 'UserName' })
  username?: string;

  @Column({ nullable: true, name: 'PassWord' })
  password?: string;

  @Column({ nullable: true, name: 'Disable' })
  disable?: boolean;

  @Column({ nullable: true, name: 'HideLich' })
  hideLich?: boolean;

  @Column({ nullable: true, name: 'NgayCapCMND' })
  ngaycapCMND?: Date;

  @Column({ nullable: true, name: 'Id_nhomLSP' })
  nhomLSPId?: number;

  @Column({ nullable: true, name: 'manhanvien' })
  manhanvien?: number;

  @Column({ nullable: true, name: 'IsCoHuu' })
  isCoHuu?: boolean;

  @Column({ nullable: true, name: 'Id_BSDaiDien' })
  bsdaidienId?: number;

  @Column({ nullable: true, name: 'NgonNgu' })
  ngonngu?: number;

  @Column({ nullable: true, name: 'PasswordProtect' })
  passwordProtect?: string;

  @Column({ nullable: true, name: 'Kinhnghiem' })
  kinhnghiem?: Date;

  @Column({ nullable: true, name: 'CreateOn' })
  createOn?: Date;

  @Column({ nullable: true, name: 'CoTinhLuongKeToan' })
  coTinhLuongKeToan?: boolean;

  @Column({ nullable: true, name: 'Id_HopDong' })
  hopdongId?: number;

  @Column({ nullable: true, name: 'Id_ThoiHanHopDong' })
  thoihanHopDongId?: number;

  @Column({ nullable: true, name: 'NgayBatDauHopDong' })
  ngaybatdauHopDong?: Date;

  @Column({ nullable: true, name: 'NgayKetThucHopDong' })
  ngayketthucHopDong?: Date;

  @Column({ nullable: true, name: 'Id_GoiBenh' })
  goibenhId?: number;

  @Column({ nullable: true, name: 'ID_ChuyenKhoa' })
  chuyenkhoaId?: number;

  @Column({ nullable: true, name: 'Id_TinhTrangHonNhan' })
  tinhtranghonnhanId?: number;

  @Column({ nullable: true, name: 'NoiCapCMND' })
  noicapCMND?: number;

  @Column({ nullable: true, name: 'GhiChu1' })
  ghichu1?: string;

  @Column({ nullable: true, name: 'ChungChiHanhNghe' })
  chungchihanhnghe?: boolean;

  @Column({ nullable: true, name: 'NgayNghiViec' })
  ngaynghiviec?: Date;

  @Column({ nullable: true, name: 'IsLichBacSy' })
  isLichBacSy?: boolean;

  @Column({ nullable: true, name: 'SoChungChiHanhNghe' })
  soChungChiHanhNghe?: string;

  @Column({ nullable: true, name: 'NoiCapChungChiHanhNghe' })
  noicapChungChiHanhNghe?: number;

  @Column({ nullable: true, name: 'NgayCapChungChiHanhNghe' })
  ngaycapChungChiHanhNghe?: Date;

  @Column({ nullable: true, name: 'PhamViHoatDongChungChiHanhNghe' })
  phamvihoatdongChungChiHanhNghe?: number;

  @Column({ nullable: true, name: 'NoiDaoTao' })
  noidaotao?: number;

  @Column({ nullable: true, name: 'ID_NguoiDuyetDon' })
  nguoiduyetdonId?: number;

  @Column({ nullable: true, name: 'ID_NhomAnhVan' })
  nhomAnhVanId?: number;

  @Column({ nullable: true, name: 'PhamViHanhNgheBoSung' })
  phamviHanhNgheBoSung?: number;

  @Column({ nullable: true, name: 'NgayGanBo' })
  ngayganbo?: Date;

  @Column({ nullable: true, name: 'PassWord_OLD' })
  passwordOLD?: string;

  @Column({ nullable: true, name: 'ID_ChucVuKhac' })
  chucvukhacId?: number;

  @Column({ nullable: true, name: 'ID_MucChamDiem' })
  muchamdiemId?: number;

  @Column({ nullable: true, name: 'remember_token' })
  rememberToken?: string;

  @Column({ nullable: true, name: 'access_token' })
  accessToken?: string;

  @Column({ nullable: true, name: 'expire_token' })
  expireToken?: string;

  @Column({ nullable: true, name: 'api_token' })
  apiToken?: string;

  @Column({ nullable: true, name: 'app_password' })
  appPassWord?: string;

  @Column({ nullable: true, name: 'Id_nhomLSPDeNghi' })
  nhomLSPDeNghiId?: number;

  @Column({ nullable: true, name: 'ID_LoaiKhoi' })
  loaikhoiId?: number;

  @Column({ nullable: true, name: 'HeSoDiemNN' })
  hesodiemNN?: number;

  @Column({ nullable: true, name: 'GhiChuReview' })
  ghichuReview?: string;

  @Column({ nullable: true, name: 'GhiChuPhongVan' })
  ghichuPhongVan?: string;

  @Column({ nullable: true, name: 'IsHuongLSP' })
  isLuongLSP?: boolean;
}
