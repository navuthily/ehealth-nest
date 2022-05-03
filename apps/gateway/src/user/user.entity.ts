import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AbstractEntity } from '@libs/common/abstract.entity';
import { UseDto } from '@libs/decorators/use-dto.decorator';
import type { UserDtoOptions } from './dto/user-dto';
import { UserDto } from './dto/user-dto';
import { ChucvuEntity } from '../chucvu/chucvu.entity';
import { ChucdanhEntity } from '../chucdanh/chucdanh.entity';
import { DmtrinhdoEntity } from '../dmtrinhdo/dmtrinhdo.entity';
import { DmloaitinhluongEntity } from '../dmloaitinhluong/dmloaitinhluong.entity';
import { DmnganhangEntity } from '../dmnganhang/dmnganhang.entity';
import { DmdonviEntity } from '../dmdonvi/dmdonvi.entity';
import { DmbophanEntity } from '../dmbophan/dmbophan.entity';
import { DmphongbanEntity } from '../dmphongban/dmphongban.entity';
import { DmloaikhoiEntity } from '../dmloaikhoi/dmloaikhoi.entity';
import { NhanvienhopdongEntity } from '../nhanvienhopdong/nhanvienhopdong.entity';
import { ChuyenkhoaEntity } from '../chuyenkhoa/chuyenkhoa.entity';
import { PhamvichungchihanhngheEntity } from '../phamvichungchihanhnghe/phamvichungchihanhnghe.entity';
import { NhanvienbangcapEntity } from '../nhanvienbangcap/nhanvienbangcap.entity';

import { TemplateHdEntity } from '../templatehd/templatehd.entity';
import { RoleType } from '@libs/common/constants/role-type';
import { String } from 'aws-sdk/clients/batch';

@Entity({ name: 'DM_NhanVien' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto, UserDtoOptions> {


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

  @Column({ nullable: true, name: 'DanToc' })
  dantoc?: string;

  @Column({ nullable: true, name: 'QuocTich' })
  quoctich?: string;

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

  @Column({ nullable: true, name: 'NgaySinh' })
  ngaysinh?: Date;

  @Column({ nullable: true, name: 'NgayVaoLam' })
  ngayvaolam?: Date;

  @Column({ nullable: true, name: 'ID_TrinhDo' })
  trinhdoId?: number;

  @Column({ nullable: true, name: 'ID_LoaiTinhLuong' })
  loaitinhluongId?: number;

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

  @Column({ nullable: true, name: 'UserName' })
  username?: string;

  @Column({ nullable: true, name: 'PassWord' })
  password?: string;

  @Column({ nullable: true, name: 'NgayCapCMND' })
  ngaycapCMND?: Date;

  @Column({ nullable: true, name: 'Id_nhomLSP' })
  nhomLSPId?: number;


  @Column({ nullable: true, name: 'IsCoHuu' })
  isCoHuu?: boolean;

  @Column({ nullable: true, name: 'PasswordProtect' })
  passwordProtect?: string;

  @Column({ nullable: true, name: 'Kinhnghiem' })
  kinhnghiem?: Date;

  @Column({ nullable: true, name: 'CoTinhLuongKeToan' })
  coTinhLuongKeToan?: boolean;

  @Column({ nullable: true, name: 'Id_HopDong' })
  hopdongId?: number;

  @Column({ nullable: true, name: 'NgayBatDauHopDong' })
  ngaybatdauHopDong?: Date;

  @Column({ nullable: true, name: 'NgayKetThucHopDong' })
  ngayketthucHopDong?: Date;

  @Column({ nullable: true, name: 'ID_ChuyenKhoa' })
  chuyenkhoaId?: number;
  @Column({ nullable: true, name: 'NoiCapCMND' })
  noicapCMND?: string;

  @Column({ nullable: true, name: 'ChungChiHanhNghe' })
  chungchihanhnghe?: boolean;

  @Column({ nullable: true, name: 'NgayNghiViec' })
  ngaynghiviec?: Date;

  @Column({ nullable: true, name: 'IsLichBacSy' })
  isLichBacSy?: boolean;

  @Column({ nullable: true, name: 'SoChungChiHanhNghe' })
  soChungChiHanhNghe?: string;

  @Column({ nullable: true, name: 'NoiCapChungChiHanhNghe' })
  noicapChungChiHanhNghe?: string;

  @Column({ nullable: true, name: 'NgayCapChungChiHanhNghe' })
  ngaycapChungChiHanhNghe?: Date;

  @Column({ nullable: true, name: 'PhamViHoatDongChungChiHanhNghe' })
  phamvihoatdongChungChiHanhNghe?: number;

  @Column({ nullable: true, name: 'PhamViHanhNgheBoSung' })
  phamviHanhNgheBoSung?: number;

  @Column({ nullable: true, name: 'ID_ChucVuKhac' })
  chucvukhacId?: number;

  @Column({ nullable: true, name: 'access_token' })
  accessToken?: string;

  @Column({ nullable: true, name: 'expire_token' })
  expireToken?: string;

  @Column({ nullable: true, name: 'ID_LoaiKhoi' })
  loaikhoiId?: number;

  @Column({ nullable: true, name: 'GhiChuReview' })
  ghichuReview?: string;

  @Column({ nullable: true, name: 'GhiChuPhongVan' })
  ghichuPhongVan?: string;

  @Column({ nullable: true, name: 'IsLuongLSP' })
  isLuongLSP?: boolean;

  @Column({ nullable: true, name: 'role', default: 'USER' })
  role: string;

  @ManyToOne(() => ChucvuEntity, (chucvu) => chucvu.nhanviens)
  @JoinColumn({ name: 'ID_ChucVu' })
  chucvu: ChucvuEntity;

  @ManyToOne(() => ChucdanhEntity, (chucdanh) => chucdanh.nhanviens)
  @JoinColumn({ name: 'ID_ChucDanh' })
  chucdanh: ChucdanhEntity;
  @ManyToOne(() => DmtrinhdoEntity, (dmtrinhdo) => dmtrinhdo.nhanviens)
  @JoinColumn({ name: 'ID_TrinhDo' })
  dmtrinhdo: DmtrinhdoEntity;

  @ManyToOne(
    () => DmloaitinhluongEntity,
    (dmloaitinhluong) => dmloaitinhluong.nhanviens,
  )
  @JoinColumn({ name: 'ID_LoaiTinhLuong' })
  dmloaitinhluong: DmloaitinhluongEntity;

  @ManyToOne(() => DmnganhangEntity, (dmnganhang) => dmnganhang.nhanviens)
  @JoinColumn({ name: 'ID_NganHang' })
  dmnganhang: DmnganhangEntity;

  @ManyToOne(() => DmdonviEntity, (dmdonvi) => dmdonvi.nhanviens)
  @JoinColumn({ name: 'ID_DonVi' })
  dmdonvi: DmdonviEntity;

  @ManyToOne(() => DmbophanEntity, (dmbophan) => dmbophan.nhanviens)
  @JoinColumn({ name: 'ID_BoPhan' })
  dmbophan: DmbophanEntity;

  @ManyToOne(() => DmphongbanEntity, (dmphongban) => dmphongban.nhanviens)
  @JoinColumn({ name: 'ID_PhongBan' })
  dmphongban: DmphongbanEntity;

  @ManyToOne(() => DmloaikhoiEntity, (dmloaikhoi) => dmloaikhoi.nhanviens)
  @JoinColumn({ name: 'ID_LoaiKhoi' })
  dmloaikhoi: DmloaikhoiEntity;

  @ManyToOne(() => ChuyenkhoaEntity, (chuyenkhoa) => chuyenkhoa.nhanviens)
  @JoinColumn({ name: 'ID_ChuyenKhoa' })
  chuyenkhoa: ChuyenkhoaEntity;


  @OneToMany(
    () => NhanvienhopdongEntity,
    (nhanvienhopdongs) => nhanvienhopdongs.nhanvien,
  )
  // @JoinColumn({ name: 'Id_HopDong' })
  nhanvienhopdongs: NhanvienhopdongEntity[];

  @OneToMany(
    () => NhanvienbangcapEntity,
    (nhanvienbangcaps) => nhanvienbangcaps.nhanvien,
  )
  nhanvienbangcaps: NhanvienbangcapEntity[];

  @ManyToOne(
    () => PhamvichungchihanhngheEntity,
    (phamvichungchihanhnghe) => phamvichungchihanhnghe.nhanviens,
  )
  @JoinColumn({ name: 'PhamViHoatDongChungChiHanhNghe' })
  phamvichungchihanhnghe: PhamvichungchihanhngheEntity;

  @ManyToOne(
    () => PhamvichungchihanhngheEntity,
    (phamvihanhnghebosung) => phamvihanhnghebosung.nhanviens,
  )
  @JoinColumn({ name: 'PhamViHanhNgheBoSung' })
  phamvihanhnghebosung: PhamvichungchihanhngheEntity;

  @OneToMany(() => TemplateHdEntity, (temp) => temp.nguoitao)
  temps: TemplateHdEntity[];
  @OneToMany(() => TemplateHdEntity, (temp) => temp.nguoisua)
  temp: TemplateHdEntity[];

  @OneToMany(() => NhanvienhopdongEntity, (nhanvienhd) => nhanvienhd.nguoitao)
  nhanvienhd: NhanvienhopdongEntity[];
  @OneToMany(
    () => NhanvienhopdongEntity,
    (nhanvienhopdong) => nhanvienhopdong.nguoisua,
  )
  nhanvienhopdong: NhanvienhopdongEntity[];
}
