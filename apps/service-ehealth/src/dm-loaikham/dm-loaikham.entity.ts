import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { random } from 'lodash';
import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, AfterLoad, ManyToOne } from 'typeorm';
import { DMLoiKhuyenEntity } from '../dm-loikhuyen/dm-loikhuyen.entity';
import { DMModuleLoaiKhamEntity } from './dm-module-loaikham.entity';

@ObjectType()
@Entity('DM_LoaiKham')
export class DMLoaiKhamEntity {
  @PrimaryColumn({ name: 'ID_LoaiKham' })
  @Field({nullable: true })
  ID_LoaiKham!: number;

  @Field({nullable: true })
  id?: number;

  @Column({ name: 'TenLoaiKham', nullable: true })
  @Field({nullable: true })
  TenLoaiKham?: string;

  @Column({ name: 'Active' })
  @Field({nullable: true })
  Active?: boolean;

  @Column({ name: 'SoLuongBs_ThucHien' })
  @Field({nullable: true })
  SoLuongBs_ThucHien?: number;

  @Column({ name: 'LoiKhuyen_App' })
  @Field({nullable: true })
  LoiKhuyen_App?: number;

  @Column({ name: 'MaVietTat' })
  @Field({nullable: true })
  maviettat?: string;

  @Column({ name: 'MaVietTat_BN' })
  @Field({nullable: true })
  maviettatbn?: string;

  @Column({ name: 'ID_NhomCLS' })
  @Field({nullable: true })
  nhomclsId?: number;
  
  @Column({ name: 'MoTa' })
  @Field({nullable: true })
  mota?: string;

  @Column({ name: 'GiaBaoChoBN' })
  @Field({nullable: true })
  giabaochobn?: number;

  @Column({ name: 'SoLuongNhanVien_ThucHien' })
  @Field({nullable: true })
  SoLuongNhanVien_ThucHien?: number;

  @Column({ name: 'IsTamUng' })
  @Field({nullable: true })
  IsTamUng?: boolean;
  
  @Column({ name: 'IsDauHieuSinhTon' })
  @Field({nullable: true })
  IsDauHieuSinhTon?: boolean;
  
  @Column({ name: 'GioiTinh_LoaiKham' })
  @Field({nullable: true })
  GioiTinh_LoaiKham?: number;

  @Column({ name: 'IsSoLuongNhieu' })
  @Field({nullable: true })
  IsSoLuongNhieu?: boolean;

  @Column({ name: 'YNghia' })
  @Field({nullable: true })
  YNghia?: string;

  @ManyToOne(() => DMLoiKhuyenEntity)
  @Field(type => DMLoiKhuyenEntity, { nullable: true })
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
  @Field(type => [DMModuleLoaiKhamEntity], { nullable: true })
  @JoinColumn({
    name: 'ID_LoaiKham', // Tên cột trong db của entity module này
    referencedColumnName: 'loaikhamId', // Tên biến của entity module kia
  })
  dmModuleLoaiKhams: DMModuleLoaiKhamEntity[];
}
