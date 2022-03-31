import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ModuleThanhVienEntity } from '../../../service-thanhvien/src/moduleThanhVien/moduleThanhVien.entity'


import { DMLoaiKhamEntity } from '../dm-loaikham/dm-loaikham.entity';
@ObjectType()
@Injectable()
@Entity('DM_Module_LoaiKham')
export class DMModuleLoaiKhamEntity {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'ID_Module' })
  @Field({nullable: true})
  moduleId?: number;

  @Column({ name: 'ID_LoaiKham' })
  @Field({nullable: true})
  loaikhamId?: number;

  @Column({ name: 'TenLoaiKham' })
  @Field({nullable: true})
  tenloaikham?: string;

  // @ManyToMany(() => DMLoaiKhamEntity)
  // @JoinColumn({ name: 'ID_Module' })
  // dmLoaiKham: DMLoaiKhamEntity;

  // @Column({ name: 'TenLoaiKham' })
  // tenloaikham?: string;

  // @Column({ name: 'TenLoaiKham' })
  // tenloaikham?: string;

  // @Column({ name: 'TenLoaiKham' })
  // tenloaikham?: string;

  @ManyToOne(() => DMLoaiKhamEntity, { nullable: true })
  @Field(type => DMLoaiKhamEntity, { nullable: true })
  @JoinColumn({
    name: 'ID_LoaiKham'
  }) // Tên biến của entity module })
  dmLoaiKham: DMLoaiKhamEntity;


  @Field({nullable: true})
  dmmodule: string


  // @OneToMany(
  //   () => BenhAnGiuongBenhEntity,
  //   (buonggiuongbenhs) => buonggiuongbenhs.thongtinluotkham,
  // )+
  // @JoinColumn({
  //   name: 'ID_LuotKham', // Tên cột trong db của entity module này
  //   referencedColumnName: 'luotkhamId', // Tên biến của entity module kia
  // })
  // buonggiuongbenhs: BenhAnGiuongBenhEntity[];
}




