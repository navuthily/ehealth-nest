/* eslint-disable simple-import-sort/imports */
import { SortDirection } from '@nestjs-query/core';
import {
  FilterableField,
  FilterableRelation,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { AbstractUserDto } from 'common/dto/abstract-user.dto';
import { DMBenhNhanDTO } from '../../dm-benhnhan/dto/dm-benhnhan.dto';

@ObjectType('ThongTinLuotkham')
@FilterableRelation('DM_BenhNhan', () => DMBenhNhanDTO, {
  nullable: true,
})
@QueryOptions({
  defaultSort: [{ field: 'id', direction: SortDirection.ASC }],
})
@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
export class ThongTinLuotKhamDTO extends AbstractUserDto {

  @FilterableField({ nullable: true })
  benhnhanId?: number;

  @FilterableField({ nullable: true })
  loaidoituongkham?: string;

  @FilterableField({ nullable: true })
  goikhamchocongtyId?: number;

  @FilterableField({ nullable: true })
  phanloaikhamId?: number;

  @FilterableField({ nullable: true })
  thoigianvaokham?: Date;

  @FilterableField({ nullable: true })
  thoigianketthuckham?: Date;

  @FilterableField({ nullable: true })
  bsyeucau?: number;

  @FilterableField({ nullable: true })
  bslamsang?: number;

  @FilterableField({ nullable: true })
  thoigiannhapvienBNNoiTru?: Date;

  @FilterableField({ nullable: true })
  khoaphongBNNoiTru?: number;

  @FilterableField({ nullable: true })
  sogiuongbenhBNNoiTru?: number;

  @FilterableField({ nullable: true })
  lichhenId?: number;

  @FilterableField({ nullable: true })
  phanloai?: string;

  @FilterableField({ nullable: true })
  sansanggoivaokham?: boolean;

  @FilterableField({ nullable: true })
  hoantatHoSo?: boolean;

  @FilterableField({ nullable: true })
  chodetraketqua?: boolean;

  @FilterableField({ nullable: true })
  noigioithieuId?: number;

  @FilterableField({ nullable: true })
  hinhthucdenId?: number;

  @FilterableField({ nullable: true })
  noidungtaikham?: string;

  @FilterableField({ nullable: true })
  diemthaido?: number;

  @FilterableField({ nullable: true })
  diemkinhte?: number;

  @FilterableField({ nullable: true })
  diemhailong?: number;

  @FilterableField({ nullable: true })
  bschodiemId?: number;

  @FilterableField({ nullable: true })
  ytchodiemId?: number;

  @FilterableField({ nullable: true })
  ngaygiohentraKQ?: Date;

  @FilterableField({ nullable: true })
  ngaygiotraKQ?: Date;

  @FilterableField({ nullable: true })
  datraKQ?: boolean;

  @FilterableField({ nullable: true })
  laydauhieusinhton?: boolean;

  @FilterableField({ nullable: true })
  bskhamxong?: boolean;

  @FilterableField({ nullable: true })
  trangthaiId?: string;

  @FilterableField({ nullable: true })
  ngayhentaikham?: Date;

  @FilterableField({ nullable: true })
  cokhamlamsang?: boolean;

  @FilterableField({ nullable: true })
  dalapHoaDon?: boolean;

  @FilterableField({ nullable: true })
  coxacdinhNhanThan?: boolean;

  @FilterableField({ nullable: true })
  loaikhamId?: number;

  @FilterableField({ nullable: true })
  daluuHoSo?: boolean;

  @FilterableField({ nullable: true })
  nguoithuchienId?: number;

  @FilterableField({ nullable: true })
  ngaygioDuKienTraKQ?: Date;

  @FilterableField({ nullable: true })
  nguoitraKQId?: number;

  @FilterableField({ nullable: true })
  renewId?: boolean;

  @FilterableField({ nullable: true })
  nguoihentraKQId?: number;

  @FilterableField({ nullable: true })
  nguoilayBenhPhamId?: number;

  @FilterableField({ nullable: true })
  ngaygiolayBenhPham?: Date;

  @FilterableField({ nullable: true })
  trangthaikham?: number;

  @FilterableField({ nullable: true })
  phongkhamvatlyId?: number;

  @FilterableField({ nullable: true })
  theId?: number;

  @FilterableField({ nullable: true })
  chon?: boolean;

  @FilterableField({ nullable: true })
  bsNVYC?: number;

  @FilterableField({ nullable: true })
  dathanhtoanBill?: boolean;

  @FilterableField({ nullable: true })
  theBHCCId?: number;

  @FilterableField({ nullable: true })
  createOn?: Date;

  @FilterableField({ nullable: true })
  tangId?: number;

  @FilterableField({ nullable: true })
  nguoihoantatAId?: number;

  @FilterableField({ nullable: true })
  nguoihoantatBId?: number;

  @FilterableField({ nullable: true })
  nguoihoantatCId?: number;

  @FilterableField({ nullable: true })
  nguoibaolanhBHCCId?: number;

  @FilterableField({ nullable: true })
  sophieukhamGoiLoa?: string;

  @FilterableField({ nullable: true })
  tongngayDieuTri?: number;

  @FilterableField({ nullable: true })
  chuyenkhoaId?: number;

  @FilterableField({ nullable: true })
  ngaygioHoanTat?: Date;

  @FilterableField({ nullable: true })
  trieuchungId?: number;

  @FilterableField({ nullable: true })
  mabuudien?: string;

  @FilterableField({ nullable: true })
  ngaygionhapMaBuuDien?: Date;

  @FilterableField({ nullable: true })
  nguoinhapMaBuuDien?: number;

  @FilterableField({ nullable: true })
  nguoichotKSKCTyId?: number;

  @FilterableField({ nullable: true })
  ngaychotKSKCTyId?: Date;

  @FilterableField({ nullable: true })
  thephuId?: number;

  @FilterableField({ nullable: true })
  nguoichotGiamGiaBHCCId?: number;

  @FilterableField({ nullable: true })
  isXuatThuoc?: boolean;

  @FilterableField({ nullable: true })
  nguoiKhoaXuatThuocId?: number;

  @FilterableField({ nullable: true })
  khachsanLKId?: number;

  @FilterableField({ nullable: true })
  khoacap1Id?: number;

  @FilterableField({ nullable: true })
  ngaygioKhoaCap1?: Date;

  @FilterableField({ nullable: true })
  luotkhamcuId?: number;

  @FilterableField({ nullable: true })
  isTaiNha?: boolean;

  @FilterableField({ nullable: true })
  moduleId?: number;
}
