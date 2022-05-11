import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '@libs/common/abstract.entity';
import { UseDto } from '@libs/decorators/use-dto.decorator';
import type { UserDtoOptions } from './dto/user-dto';
import { UserDto } from './dto/user-dto';
import { ChucvuEntity } from '../chucvu/chucvu.entity';
import { ChucdanhEntity } from '../chucdanh/chucdanh.entity';
import { DmtrinhdoEntity } from '../dmtrinhdo/dmtrinhdo.entity';
import { DmloaitinhluongEntity } from '../dmloaitinhluong/dmloaitinhluong.entity';
import { DmdonviEntity } from '../dmdonvi/dmdonvi.entity';
import { DmbophanEntity } from '../dmbophan/dmbophan.entity';
import { DmphongbanEntity } from '../dmphongban/dmphongban.entity';
import { DmloaikhoiEntity } from '../dmloaikhoi/dmloaikhoi.entity';
import { NhanvienhopdongEntity } from '../nhanvienhopdong/nhanvienhopdong.entity';
import { ChuyenkhoaEntity } from '../chuyenkhoa/chuyenkhoa.entity';

import { TemplateHdEntity } from '../templatehd/templatehd.entity';
import { DmloaihopdongEntity } from '../dmloaihopdong/dmloaihopdong.entity';

@Entity({ name: 'NhanVien' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto, UserDtoOptions> {
  @Column({ nullable: true, name: 'ho_lot' })
  holotNhanVien?: string;

  @Column({ nullable: true, name: 'ten' })
  tennhanvien?: string;

  @Column({ nullable: true, name: 'nickname' })
  nickname?: string;

  @Column({ nullable: true, name: 'so_dien_thoai' })
  mobile?: string;

  @Column({ nullable: true, name: 'hinh_nhan_vien' })
  hinhNhanVien?: string;

  @Column({ nullable: true, name: 'gioi_tinh' })
  gioitinh?: boolean;

  @Column({ nullable: true, name: 'quoc_tich' })
  quoctich?: string;

  @Column({ nullable: true, name: 'CMND' })
  cmnd?: string;

  @Column({ nullable: true, name: 'ngay_cap_CMND' })
  ngaycapcmnd?: Date;

  @Column({ nullable: true, name: 'noi_cap_CMND' })
  noicapcmnd?: string;

  @Column({ nullable: true, name: 'ho_chieu' })
  hochieu?: string;

  @Column({ nullable: true, name: 'dia_chi' })
  diachi?: string;

  @Column({ nullable: true, name: 'email' })
  email: string;

  @Column({ nullable: true, name: 'ngay_sinh' })
  ngaysinh?: Date;

  @Column({ nullable: true, name: 'ngay_vao_lam' })
  ngayvaolam?: Date;

  @Column({ nullable: true, name: 'ngay_nghi_viec' })
  ngaynghiviec?: Date;

  @Column({ nullable: true, name: 'ma_so_thue_ca_nhan' })
  masothuecanhan?: string;

  @Column({ nullable: true, name: 'so_bao_hiem' })
  sobaohiem?: string;

  @Column({ nullable: true, name: 'hinh_chu_ky' })
  hinhchuky?: string;

  @Column({ nullable: true, name: 'allow_login' })
  allowLogin?: boolean;

  @Column({ nullable: true, name: 'password' })
  password?: string;

  @Column({ nullable: true, name: 'role', default: 'USER' })
  role: string;

  @Column({ nullable: true, name: 'trinh_do_id' })
  trinhdoId?: number;

  @Column({ nullable: true, name: 'don_vi_id' })
  donviId?: number;

  @Column({ nullable: true, name: 'bo_phan_id' })
  bophanId?: number;

  @Column({ nullable: true, name: 'phong_ban_id' })
  phongbanId?: number;

  @Column({ nullable: true, name: 'chuc_vu_id' })
  chucvuId?: number;

  @Column({ nullable: true, name: 'chuc_danh_id' })
  chucdanhId?: number;

  @Column({ nullable: true, name: 'loai_tinh_luong_id' })
  loaitinhluongId?: number;

  @Column({ nullable: true, name: 'chuyen_khoa_id' })
  chuyenkhoaId?: number;

  @Column({ nullable: true, name: 'loai_khoi_id' })
  loaikhoiId?: number;



  @Column({ nullable: true, name: 'created_by' })
  createdBy?: number;
  
  @Column({ nullable: true, name: 'updated_by' })
  updatedBy?: number;

  @ManyToOne(() => ChucvuEntity, (chucvu) => chucvu.nhanviens)
  @JoinColumn({ name: 'chuc_vu_id' })
  chucvu: ChucvuEntity;

  @ManyToOne(() => ChucdanhEntity, (chucdanh) => chucdanh.nhanviens)
  @JoinColumn({ name: 'chuc_danh_id' })
  chucdanh: ChucdanhEntity;

  @ManyToOne(() => DmtrinhdoEntity, (dmtrinhdo) => dmtrinhdo.nhanviens)
  @JoinColumn({ name: 'trinh_do_id' })
  dmtrinhdo: DmtrinhdoEntity;

  @ManyToOne(
    () => DmloaitinhluongEntity,
    (dmloaitinhluong) => dmloaitinhluong.nhanviens,
  )
  @JoinColumn({ name: 'loai_tinh_luong_id' })
  dmloaitinhluong: DmloaitinhluongEntity;

  @ManyToOne(() => DmdonviEntity, (dmdonvi) => dmdonvi.nhanviens)
  @JoinColumn({ name: 'don_vi_id' })
  dmdonvi: DmdonviEntity;

  @ManyToOne(() => DmbophanEntity, (dmbophan) => dmbophan.nhanviens)
  @JoinColumn({ name: 'bo_phan_id' })
  dmbophan: DmbophanEntity;

  @ManyToOne(() => DmphongbanEntity, (dmphongban) => dmphongban.nhanviens)
  @JoinColumn({ name: 'phong_ban_id' })
  dmphongban: DmphongbanEntity;

  @ManyToOne(() => DmloaikhoiEntity, (dmloaikhoi) => dmloaikhoi.nhanviens)
  @JoinColumn({ name: 'loai_khoi_id' })
  dmloaikhoi: DmloaikhoiEntity;

  @ManyToOne(() => ChuyenkhoaEntity, (chuyenkhoa) => chuyenkhoa.nhanviens)
  @JoinColumn({ name: 'chuyen_khoa_id' })
  chuyenkhoa: ChuyenkhoaEntity;

  @OneToMany(
    () => NhanvienhopdongEntity,
    (nhanvienhopdongs) => nhanvienhopdongs.nhanvien,
  )
  nhanvienhopdongs: NhanvienhopdongEntity[];

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



  @OneToMany(() => ChucvuEntity, (cv) => cv.nguoitao)
  nguoitaochucvu: ChucvuEntity[];

  @OneToMany(() => ChucvuEntity, (cv) => cv.nguoisua)
  nguoisuachucvu: ChucvuEntity[];

  @OneToMany(() => ChucdanhEntity, (cd) => cd.nguoitao)
  nguoitaochucdanh: ChucdanhEntity[];

  @OneToMany(() => ChucdanhEntity, (cd) => cd.nguoisua)
  nguoisuachucdanh: ChucdanhEntity[];

  @OneToMany(() => ChuyenkhoaEntity, (cv) => cv.nguoitao)
  nguoitaochuyenkhoa: ChuyenkhoaEntity[];

  @OneToMany(() => ChuyenkhoaEntity, (cv) => cv.nguoisua)
  nguoisuachuyenkhoa: ChuyenkhoaEntity[];

  @OneToMany(() => DmbophanEntity, (cd) => cd.nguoitao)
  nguoitaobophan: DmbophanEntity[];

  @OneToMany(() => DmbophanEntity, (cd) => cd.nguoisua)
  nguoisuabophan: DmbophanEntity[];

  @OneToMany(() => DmdonviEntity, (cd) => cd.nguoitao)
  nguoitaodonvi: DmdonviEntity[];

  @OneToMany(() => DmdonviEntity, (cd) => cd.nguoisua)
  nguoisuadonvi: DmdonviEntity[];

  @OneToMany(() => DmloaihopdongEntity, (cd) => cd.nguoitao)
  nguoitaoloaihopdong: DmloaihopdongEntity[];

  @OneToMany(() => DmloaihopdongEntity, (cd) => cd.nguoisua)
  nguoisualoaihopdong: DmloaihopdongEntity[];

  @OneToMany(() => DmloaikhoiEntity, (cd) => cd.nguoitao)
  nguoitaoloaikhoi: DmloaikhoiEntity[];

  @OneToMany(() => DmloaikhoiEntity, (cd) => cd.nguoisua)
  nguoisualoaikhoi: DmloaikhoiEntity[];

  @OneToMany(() => DmloaitinhluongEntity, (cd) => cd.nguoitao)
  nguoitaoloaitinhluong: DmloaitinhluongEntity[];

  @OneToMany(() => DmloaitinhluongEntity, (cd) => cd.nguoisua)
  nguoisualoaitinhluong: DmloaitinhluongEntity[];

  @OneToMany(() => DmphongbanEntity, (cd) => cd.nguoitao)
  nguoitaophongban: DmphongbanEntity[];

  @OneToMany(() => DmphongbanEntity, (cd) => cd.nguoisua)
  nguoisuaphongban: DmphongbanEntity[];

  @OneToMany(() => DmtrinhdoEntity, (cd) => cd.nguoitao)
  nguoitaotrinhdo: DmtrinhdoEntity[];

  @OneToMany(() => DmtrinhdoEntity, (cd) => cd.nguoisua)
  nguoisuatrinhdo: DmtrinhdoEntity[];

}
