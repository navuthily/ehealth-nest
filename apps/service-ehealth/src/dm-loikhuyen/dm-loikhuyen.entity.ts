import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DMLoaiKhamEntity } from '../dm-loaikham/dm-loaikham.entity';

@Entity('Gd2_DanhMuc_LoiKhuyen')


@ObjectType()
export class DMLoiKhuyenEntity {

  @PrimaryColumn({ name: 'Id_Auto' })
  @Field()
  autoId!: number;

  @Field({nullable: true })
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
