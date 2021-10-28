/* eslint-disable simple-import-sort/imports */
import {
  BeforeCreateOne,
  CreateOneInputType,
  FilterableField,
  FilterableOffsetConnection,
} from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';
import { UserContext } from 'modules/auth/auth.interfaces';
import { ThongTinLuotKhamDTO } from '../../thongtinluotkham/dto/thongtinluotkham.dto';

@ObjectType('DM_BenhNhan')
@FilterableOffsetConnection('thongTinLuotKhams', () => ThongTinLuotKhamDTO, {
  nullable: true,
  //   defaultResultSize: 1_000_000,
  //   maxResultsSize:
})
@BeforeCreateOne(
  (input: CreateOneInputType<DMBenhNhanDTO>, context: UserContext) => {
    console.log(1);

    console.log(context.req.user);
    input.input.idNguoiTao = context.req.user.id;
    return input;
  },
)
export class DMBenhNhanDTO {
  @FilterableField()
  id: number;

  @FilterableField({ nullable: true })
  maBenhNhan: number;

  @FilterableField({ nullable: true })
  hoLotBenhNhan: string;

  @FilterableField({ nullable: true })
  tenBenhNhan: string;

  @FilterableField({ nullable: true })
  ngayThangNamSinh: Date;

  @FilterableField({ nullable: true })
  gioiTinh: number;

  @FilterableField({ nullable: true })
  dienThoai1: string;

  @FilterableField({ nullable: true })
  dienThoai2: string;

  @FilterableField({ nullable: true })
  diaChi: string;

  @FilterableField({ nullable: true })
  tenNguoiLienHe: string;

  @FilterableField({ nullable: true })
  quanHeVoiBN: string;

  @FilterableField({ nullable: true })
  dienThoaiNguoiLienHe: string;

  @FilterableField({ nullable: true })
  ghiChu: string;

  @FilterableField({ nullable: true })
  idNguoiTao?: string;
}
