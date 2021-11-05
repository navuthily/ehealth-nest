// eslint-disable-next-line unicorn/filename-case
import { AbstractUserEntity } from 'common/abstract-user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Gd2_PhieuXuatNoiBo')
export class PhieuXuatNoiBoEntity extends AbstractUserEntity {
  @PrimaryGeneratedColumn({ name: 'ID_PhieuXuatNoiBo' })
  phieuxuatnoiboId: number;

  @Column({ name: 'Id_NguoiTao' })
  idNguoiTao: number;

  @Column({ type: 'datetime2' })
  ngaygiotao: Date;

  @Column({ name: 'SoPhieu' })
  sophieu: number;

  @Column({ name: 'NguoiChot' })
  nguoichot?: number;

  @Column({ name: 'NgayChot' })
  ngaychot?: Date;

  
}
