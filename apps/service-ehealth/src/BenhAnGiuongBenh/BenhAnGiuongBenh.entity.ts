import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DMBuongGiuongBenhEntity } from '../DMBuongGiuongBenh/DMBuongGiuongBenh.entity';
import { ThongTinLuotKhamEntity } from '../thongtinluotkham/thongtinluotkham.entity';

@Entity('GD2_BenhAn_GiuongBenh')
export class BenhAnGiuongBenhEntity {
  @PrimaryColumn({ name: 'Id_BenhAn_GiuongBenh' })
  benhangiuongbenhId!: number;

  @Column({ name: 'Id_LuotKham' })
  luotkhamId!: number;

  @Column({ name: 'Id_BuongGiuong' })
  buongiuongId!: number;

  @Column({ name: 'TrangThai' })
  trangthai?: string;

  @Column({ name: 'NgayGioBatDauSuDung', type: 'datetime2' })
  ngaygiobatdauSuDung?: Date;

  @ManyToOne(() => DMBuongGiuongBenhEntity)
  @JoinColumn({
    name: 'Id_BuongGiuong', // Tên cột trong db của entity module này
    referencedColumnName: 'buongiuongId', // Tên biến của entity module kia
  })
  buonggiuongbenh: DMBuongGiuongBenhEntity;

  @ManyToOne(() => ThongTinLuotKhamEntity)
  @JoinColumn({
    name: 'ID_LuotKham', // Tên cột trong db của entity module này
    referencedColumnName: 'luotkhamId', // Tên biến của entity module kia
  })
  thongtinluotkham: ThongTinLuotKhamEntity;
}
