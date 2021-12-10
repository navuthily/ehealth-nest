import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import moment from 'moment';

@Entity('DM_BenhNhan')
export class DMBenhNhanEntity {
  @PrimaryColumn({ name: 'ID_BenhNhan' })
  benhnhanId!: number;

  @Column({ name: 'NamSinh' })
  namsinh?: number;

  @Column({ name: 'NgayThangNamSinh', type: 'datetime2' })
  ngaythangnamsinh?: Date;

  @Column({ name: 'HoLotBenhNhan'})
  HoLotBenhNhan?: string;

  @Column({ name: 'TenBenhNhan'})
  TenBenhNhan?: string;

  @Column({ name: 'GioiTinh'})
  GioiTinh?: number;

  @Column({ name: 'DienThoai1'})
  DienThoai1?: string;

  @Column({ name: 'DiaChi'})
  DiaChi?: string;

  tuoi?: string;

  @AfterLoad()
  afterLoad() {
    const currentDate = moment(new Date());
    if (this.ngaythangnamsinh) {
      const birthDate = moment(this.ngaythangnamsinh);
      if (birthDate) {
        const getDay = currentDate.diff(birthDate, 'days');
        const getMonth = currentDate.diff(birthDate, 'months');
        const getYear = currentDate.diff(birthDate, 'years');
        if (getDay >= 0 && getDay < 30) {
          this.tuoi = getDay.toString() + ' Ngày';
        } else if (getDay >= 30 && getMonth <= 72) {
          this.tuoi = getMonth.toString() + ' Tháng';
        } else {
          this.tuoi = getYear.toString() + ' Tuổi';
        }
      }
    }
  }

}
