// eslint-disable-next-line unicorn/filename-case
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ThongTinLuotkham } from '../thongtinluotkham/thongtinluotkham.entity';

@Entity('DM_BenhNhan')
export class DMBenhNhanEntity {
  @PrimaryGeneratedColumn({ name: 'ID_BenhNhan' })
  id: number;

  @Column({ name: 'MaBenhNhan' })
  maBenhNhan: number;

  @Column({ name: 'HoLotBenhNhan' })
  hoLotBenhNhan: string;

  @Column({ name: 'TenBenhNhan' })
  tenBenhNhan: string;

  @Column({ name: 'NgayThangNamSinh' })
  ngayThangNamSinh: Date;

  @Column({ name: 'GioiTinh' })
  gioiTinh: number;

  @Column({ name: 'DienThoai1' })
  dienThoai1: string;

  @Column({ name: 'DienThoai2' })
  dienThoai2: string;

  @Column({ name: 'DiaChi' })
  diaChi: string;

  @Column({ name: 'TenNguoiLienHe' })
  tenNguoiLienHe: string;

  @Column({ name: 'QuanHeVoiBN' })
  quanHeVoiBN: string;

  @Column({ name: 'DienThoaiNguoiLienHe' })
  dienThoaiNguoiLienHe: string;

  @Column({ name: 'GhiChu' })
  ghiChu?: string;

  @Column({ name: 'ID_NguoiTao' })
  idNguoiTao?: string;

  @CreateDateColumn({ name: 'NgayTao' })
  ngaytao!: Date;

  @BeforeInsert()
  insertNgayTao(): void {
    this.ngaytao = new Date();
  }

  @OneToMany(
    () => ThongTinLuotkham,
    (thongtinluotkhams) => thongtinluotkhams.dmBenhNhan,
  )
  @JoinColumn({ name: 'ID_BenhNhan' })
  thongTinLuotKhams: ThongTinLuotkham[];
}
