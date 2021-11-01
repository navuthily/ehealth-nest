// eslint-disable-next-line unicorn/filename-case
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Gd2_PhieuXuatNoiBo')
export class PhieuXuatNoiBoEntity {
  @PrimaryGeneratedColumn({ name: 'ID_PhieuXuatNoiBo' })
  id: number;

  @Column({ name: 'Id_NguoiTao' })
  idNguoiTao: number;

  @Column({ name: 'NgaygioTao' })
  ngaygiotao: Date;

  @Column({ name: 'SoPhieu' })
  sophieu: number;

  @Column({ name: 'NguoiChot' })
  nguoichot?: number;

  @Column({ name: 'NgayChot' })
  ngaychot?: Date;

  @BeforeInsert()
  insertNgayTao(): void {
    this.ngaygiotao = new Date();
  }

  @BeforeUpdate()
  updateNgayChot(): void {
    this.ngaychot = new Date();
  }
}
