import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DMLoaiKhamEntity } from '../dm-loaikham/dm-loaikham.entity';

@Entity('Gd2_DanhMuc_LoiKhuyen')
export class DMLoiKhuyenEntity {
  @PrimaryColumn({ name: 'Id_Auto' })
  autoId!: number;

  @Column({ name: 'NoiDungLoiKhuyen' })
  noidungloikhuyen?: string;

  // @OneToMany(() => DMLoaiKhamEntity)
  // @JoinColumn({ name: 'Id_Auto' })
  // dmLoaiKham: DMLoaiKhamEntity;


  // @Column({ name: 'TenLoaiKham' })
  // tenloaikham?: string;

  // @Column({ name: 'TenLoaiKham' })
  // tenloaikham?: string;

  // @Column({ name: 'TenLoaiKham' })
  // tenloaikham?: string;

  // @ManyToOne(() => DMBenhNhanEntity)
  // @JoinColumn({ name: 'ID_BenhNhan' })
  // dmBenhNhan: DMBenhNhanEntity;

  // @OneToMany(
  //   () => BenhAnGiuongBenhEntity,
  //   (buonggiuongbenhs) => buonggiuongbenhs.thongtinluotkham,
  // )
  // @JoinColumn({
  //   name: 'ID_LuotKham', // Tên cột trong db của entity module này
  //   referencedColumnName: 'luotkhamId', // Tên biến của entity module kia
  // })
  // buonggiuongbenhs: BenhAnGiuongBenhEntity[];
}
