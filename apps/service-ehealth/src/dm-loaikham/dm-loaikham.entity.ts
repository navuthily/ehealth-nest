import { random } from 'lodash';
import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, AfterLoad, ManyToOne } from 'typeorm';
import { DMLoiKhuyenEntity } from '../dm-loikhuyen/dm-loikhuyen.entity';
import { DMModuleLoaiKhamEntity } from './dm-module-loaikham.entity';


@Entity('DM_LoaiKham')
export class DMLoaiKhamEntity {
  @PrimaryColumn({ name: 'ID_LoaiKham' })
  ID_LoaiKham!: number;

  id?: number;

  @Column({ name: 'TenLoaiKham' })
  TenLoaiKham?: string;

  @Column({ name: 'Active' })
  Active?: boolean;

  @Column({ name: 'SoLuongBs_ThucHien' })
  SoLuongBs_ThucHien?: number;

  @Column({ name: 'LoiKhuyen_App' })
  LoiKhuyen_App?: number;

  @Column({ name: 'MaVietTat' })
  maviettat?: string;

  @Column({ name: 'MaVietTat_BN' })
  maviettatbn?: string;

  @Column({ name: 'ID_NhomCLS' })
  nhomclsId?: number;
  
  @Column({ name: 'MoTa' })
  mota?: string;

  @Column({ name: 'GiaBaoChoBN' })
  giabaochobn?: number;

  @Column({ name: 'SoLuongNhanVien_ThucHien' })
  SoLuongNhanVien_ThucHien?: number;

  @Column({ name: 'IsTamUng' })
  IsTamUng?: boolean;
  
  @Column({ name: 'IsDauHieuSinhTon' })
  IsDauHieuSinhTon?: boolean;
  
  @Column({ name: 'GioiTinh_LoaiKham' })
  GioiTinh_LoaiKham?: number;

  @Column({ name: 'IsSoLuongNhieu' })
  IsSoLuongNhieu?: boolean;

  @Column({ name: 'YNghia' })
  YNghia?: string;

  @ManyToOne(() => DMLoiKhuyenEntity)
  @JoinColumn({ name: 'LoiKhuyen_App' })
   dmLoiKhuyen: DMLoiKhuyenEntity;

   @AfterLoad()
   afterLoad() {
    this.id = random(1,1000000);
  }

  //  @ManyToMany(() => BenhAnGiuongBenhEntity)
  //  @JoinColumn({ name: 'LoiKhuyen_App' })
  //  dmLoiKhuyen: DMLoiKhuyenEntity;
  // @Column({ name: 'TenLoaiKham' })
  // tenloaikham?: string;

  // @Column({ name: 'TenLoaiKham' })
  // tenloaikham?: string;

  // @Column({ name: 'TenLoaiKham' })
  // tenloaikham?: string;

  // @ManyToOne(() => DMBenhNhanEntity)
  // @JoinColumn({ name: 'ID_BenhNhan' })
  // dmBenhNhan: DMBenhNhanEntity;

  @OneToMany(
    () => DMModuleLoaiKhamEntity,
    (dmmoduleloaikhams) => dmmoduleloaikhams.dmLoaiKham,
    {nullable:true}
  )
  @JoinColumn({
    name: 'ID_LoaiKham', // Tên cột trong db của entity module này
    referencedColumnName: 'loaikhamId', // Tên biến của entity module kia
  })
  dmModuleLoaiKhams: DMModuleLoaiKhamEntity[];
}
